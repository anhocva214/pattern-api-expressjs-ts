import StatusCodes, {  } from 'http-status-codes';
import { Request, Response } from 'express';
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY , BAD_REQUEST} = StatusCodes;
import {User} from '@models/user.model';
import {v1 as uuidv1} from 'uuid'
import { Token } from '@models/token.model';
import { trans } from '@resources/trans';
import bcrypt from 'bcrypt'
import { ENV } from '@helpers/env.helper';
import JwtService from '@services/jwt.service';
import UsersStore from '@stores/users.store';
import TokensStore from '@stores/token.store';
import { TLang } from '@resources/trans/interface';


export default class UserController {
    private user: User;
    private usersStore: UsersStore;
    private jwtService: JwtService;
    private LOGIN_EXPIRES_IN: number;
    private tokensStore: TokensStore;
    
    constructor(){
        this.user = new User();
        this.usersStore = new UsersStore();
        this.jwtService = new JwtService();
        this.LOGIN_EXPIRES_IN = 60*60*8
        this.tokensStore = new TokensStore();
    }

    // Regiser new user
    async register(req: Request, res: Response){
        let user = new User(req.body)
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt())
        user.role = 'user'
        let newUser = await this.usersStore.create(user)
        return res.status(OK).send({message: trans.response[req.lang as TLang].register_successfully, user: newUser})
    }

    // Login
    async login(req: Request, res: Response){
        let {username, password} = req.body;
        let user = await this.usersStore.findOne({username})

        if (!user || !await bcrypt.compare(password, user.password)){
            return res.status(401).send({message: trans.response[req.lang as TLang].login_failure})
        }

        let token = new Token()
        token.module_id = user._id;
        token.payload = this.jwtService.login(user, this.LOGIN_EXPIRES_IN)
        token.expires_in = this.LOGIN_EXPIRES_IN

        await this.tokensStore.create(token)

        return res.status(200).send({
            message: trans.response[req.lang as TLang].login_successfully,
            user,
            token:{
                access_token: token.payload,
                expires_in: token.expires_in
            }
        })
        
    }

    // logout
    async logout(req: Request, res: Response){
        await this.tokensStore.deleteOne({module_id: req.user._id, _id: req.tokenId})
        return res.status(OK).send({message: trans.response[req.lang as TLang].logout_successfully})
    }

    // check access token
    async authenticate(req: Request, res: Response){
        return res.status(OK).send(req.user)
    }

    // update info
    async update(req: Request, res: Response){
        let user = new User(req.user);
        let payloadValidate = req.payloadValidate;
        await this.usersStore.updateOne({_id: user._id}, {...payloadValidate})
        return res.status(200).send({message: trans.response[req.lang as TLang].update_successfully})
    }

    // get my info
    async myInfo(req: Request, res: Response){
        let user = new User(req.user);
        return res.status(200).send(user)
    }

    // get all users
    async getAll(req: Request, res: Response){
        let users = await this.usersStore.find({})
        return res.status(200).send(users)
    }
}

