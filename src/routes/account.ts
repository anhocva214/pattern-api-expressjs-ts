import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY } = StatusCodes;
import {Account} from '@entities/account';
import {AddOne, GetList, GetOne, UpdateOne} from '@database/account/controller';
import {NotPermission, ErrorSystem} from '@shared/constants';
import {GenerateToken, DecodeToken} from '@shared/auth';



/**
 * Add one account.
 */

export const AddOneAccount = async (req: Request, res: Response)=>{
    let account:Account={
        username: req.body.username,
        password: req.body.password,
        token: ""
    };

    let account_existed = await GetOne(account.username);

    if (!!account_existed){
        return res.status(BAD_GATEWAY).send({message: "Username is existed"})
    }
    else if (!account.username || !account.password){
        return res.status(FORBIDDEN).send({message: "Invalid username/password"})
    }
    else{
        if (await AddOne(account)){
            return res.status(CREATED).send({message: "Create account success"})
        }
        else{
            return res.status(BAD_GATEWAY).send({message: ErrorSystem})
        }
    }

}


/**
 * Get all accounts
 */

export const GetListAccount = async (req: Request, res: Response)=>{
    let list = await GetList();
    return res.status(OK).send({message: "Get list success", data: list})
}


/**
 * Login width account
 */

export const Login = async (req: Request, res: Response)=>{
    let account = await GetOne(req.body.username);
    // console.log(account)

    if (!!!account){
        return res.status(BAD_GATEWAY).send({message: "Account not exists"})
    }
    else if (account.password !== req.body.password){
        return res.status(BAD_GATEWAY).send({message: "Invalid username/password"})
    }
    else {
        // success
        let info = {
            username: req.body.username
        }
        let token = GenerateToken(info);
        UpdateOne(info.username, {token: token})

        return res.status(OK).send({message: "Login success", data: info, token })
    }
}


/**
 * Logout width account
 */

export const Logout = async (req: Request, res: Response)=>{
    let token : any = req.headers.token;
    let dataToken : any = await DecodeToken(token);
    // console.log(data)
    await UpdateOne(dataToken.data.username, {token: ""})
    return res.status(OK).send({message: "Logout success"})
}


/**
 * Check token from user request
 */

export const CheckTokenUser = async (req: Request, res: Response) =>{
    return res.status(OK).send({message: "Token avaliable"})
}