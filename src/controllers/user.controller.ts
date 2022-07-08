import StatusCodes, {  } from 'http-status-codes';
import { Request, Response } from 'express';
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY , BAD_REQUEST} = StatusCodes;
import {User} from '@models/user.model';
import {v1 as uuidv1} from 'uuid'
import UsersRepository from '@repositories/users.repository';
import { Token } from '@models/token.model';
import JwtRepository from '@repositories/jwt.repository';
import TokensRepository from '@repositories/token.repository';
import { trans } from '@resources/trans';
import { TLang } from '@interfaces/trans.interface';
import bcrypt from 'bcrypt'
import { ENV } from '@helpers/env.helper';


export default class UserController {
    private user: User;
    private usersRepository: UsersRepository;
    private jwtRepository: JwtRepository;
    private LOGIN_EXPIRES_IN: number;
    private tokensRepository: TokensRepository;
    
    constructor(){
        this.user = new User();
        this.usersRepository = new UsersRepository();
        this.jwtRepository = new JwtRepository();
        this.LOGIN_EXPIRES_IN = 60*60*8
        this.tokensRepository = new TokensRepository();
    }

    // Regiser new user
    async register(req: Request, res: Response){
        let user = new User(req.body)
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt())
        user.role = 'user'
        let newUser = await this.usersRepository.create(user)
        return res.status(OK).send({message: trans.response[req.lang as TLang].message.register_successfully, user: newUser})
    }

    // Login
    async login(req: Request, res: Response){
        let {username, password} = req.body;
        let user = await this.usersRepository.findOne({username})

        if (!user || !await bcrypt.compare(password, user.password)){
            return res.status(401).send({message: trans.response[req.lang as TLang].message.login_failure})
        }

        let token = new Token()
        token.module_id = user._id;
        token.payload = this.jwtRepository.login(user, this.LOGIN_EXPIRES_IN)
        token.expires_in = this.LOGIN_EXPIRES_IN

        await this.tokensRepository.create(token)

        return res.status(200).send({
            message: trans.response[req.lang as TLang].message.login_successfully,
            user,
            token:{
                access_token: token.payload,
                expires_in: token.expires_in
            }
        })
        
    }

    // logout
    async logout(req: Request, res: Response){
        await this.tokensRepository.deleteOne({module_id: req.user._id, _id: req.tokenId})
        return res.status(OK).send({message: trans.response[req.lang as TLang].message.logout_successfully})
    }

    // check access token
    async authenticate(req: Request, res: Response){
        return res.status(OK).send(req.user)
    }

    // update info
    async update(req: Request, res: Response){
        let user = new User(req.user);
        let payloadValidate = req.payloadValidate;
        await this.usersRepository.updateOne({_id: user._id}, {...payloadValidate})
        return res.status(200).send({message: trans.response[req.lang as TLang].message.update_successfully})
    }

    // get my info
    async myInfo(req: Request, res: Response){
        let user = new User(req.user);
        return res.status(200).send(user)
    }

    // get all users
    async getAll(req: Request, res: Response){
        let users = await this.usersRepository.find({})
        return res.status(200).send(users)
    }
}

