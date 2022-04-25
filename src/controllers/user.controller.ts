import StatusCodes, {  } from 'http-status-codes';
import { Request, Response } from 'express';
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY , BAD_REQUEST} = StatusCodes;
import {User} from '@models/user.model';
import {HashMD5} from '@shared/functions'
import {v1 as uuidv1} from 'uuid'
import UsersRepository from '@repositories/users.repository';


export default class UserController {
    private user: User;
    private usersRepository: UsersRepository;
    
    constructor(){
        this.user = new User();
        this.usersRepository = new UsersRepository();
    }

    // Regiser new user
    async register(req: Request, res: Response){
        let user = new User(req.body)
        let newUser = await this.usersRepository.create(user)
        return res.status(OK).send({message: "Register successfully", user: newUser})
    }

    // Login
    async login(req: Request, res: Response){
        
    }

    // logout
    async logout(req: Request, res: Response){
       
    }

    // check access token
    async authenticate(req: Request, res: Response){
        return res.status(OK).send({data: req.user})
    }

    // update info
    async update(req: Request, res: Response){
       
    }


}

