import { NextFunction, Request, Response } from "express";
import { JwtService } from "@services/jwt.service";
import StatusCode from "http-status-codes";
const {UNAUTHORIZED} = StatusCode;
import UserService from '@services/user.service'
import AdminService from '@services/admin.service'



export async function userMiddleware(req: Request, res: Response, next: NextFunction) {
    let authorization : string = req.headers.authorization as string;
    let accessToken = authorization.split(" ")[1].trim();
    // console.log("access_token: ", accessToken)
    const jwtService = new JwtService();
    let data = jwtService.verifyJwt(accessToken);
    if (!data)
        return res.status(UNAUTHORIZED).send({message: 'Access token invalid'})

    let userServive = new UserService()
    let user = await userServive.findOne({id: data.id})
    if (!user)
        return res.status(UNAUTHORIZED).send({message: 'Access token invalid'})

    if (user.access_token != accessToken)
        return res.status(UNAUTHORIZED).send({message: 'Access token does not match'})

    req.user = user;
    next()
}

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    let authorization : string = req.headers.authorization as string;
    let accessToken = authorization.split(" ")[1].trim();
    // console.log("access_token: ", accessToken)
    const jwtService = new JwtService();
    let data = jwtService.verifyJwt(accessToken);
    if (!data)
        return res.status(UNAUTHORIZED).send({message: 'Access token invalid'})

    let adminService = new AdminService()
    let admin = await adminService.findOne({id: data.id})
    if (!admin)
        return res.status(UNAUTHORIZED).send({message: 'Access token invalid'})

    if (admin.access_token != accessToken)
        return res.status(UNAUTHORIZED).send({message: 'Access token does not match'})

    req.user = admin;
    next()
}