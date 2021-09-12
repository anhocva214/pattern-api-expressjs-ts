import StatusCodes, {  } from 'http-status-codes';
import { Request, Response } from 'express';
const { UNAUTHORIZED, CREATED, OK, BAD_GATEWAY , BAD_REQUEST} = StatusCodes;
import {Admin} from '@models/admin.model';
import {HashMD5} from '@shared/functions'
import {v1 as uuidv1} from 'uuid'
import {JwtService} from '@services/jwt.service'
import AdminService from '@services/admin.service'

export default class AdminController {
    
    private admin : Admin;
    private adminService : AdminService;
    private jwtService : JwtService;

    constructor(){
        this.admin = new Admin();
        this.adminService = new AdminService();
        this.jwtService = new JwtService();
    }

    // create new admin
    async create(req: Request, res: Response){
        this.admin = new Admin(req.body);
        if (!this.admin.username || !this.admin.password || !req.body.code)
            return res.status(BAD_REQUEST).send({message: "Info invalid"})
        if (req.body.code != "122112")
            return res.status(UNAUTHORIZED).send({message: "Code is wrong"})

        this.admin.id = uuidv1();
        this.admin.password = HashMD5(this.admin.password)
        this.adminService.create(this.admin)

        return res.status(OK).send({message: "Create admin successfully"})
    }

    // login
    async login(req: Request, res: Response){
        this.admin = new Admin(req.body)
        let admin = await this.adminService.findOne({
            username: this.admin.username, 
            password: HashMD5(this.admin.password)
        })

        if (!admin) return res.status(BAD_REQUEST).send({message: "Login fail"})

        this.admin = admin;
        this.admin.access_token = await this.jwtService.generateJwt(this.admin);
        this.adminService.update(this.admin);
        return res.status(OK).send({message: "login successfully", data: this.admin})
    }

    // authenticate
    async authenticate(req: Request, res: Response){
        this.admin = new Admin(req.user);
        return res.status(OK).send({ data: this.admin})
    }
}