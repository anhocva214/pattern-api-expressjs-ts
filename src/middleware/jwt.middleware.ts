import JwtRepository from "@repositories/jwt.repository";
import TokensRepository from "@repositories/token.repository";
import UsersRepository from "@repositories/users.repository";
import { NextFunction, Request, Response } from "express";
import StatusCode from "http-status-codes";
const { UNAUTHORIZED } = StatusCode;

const jwtRepository = new JwtRepository()
const tokensRepository = new TokensRepository()
const usersRepository = new UsersRepository()

export default function middleware(role: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            let authorization: string = req.headers.authorization as string;
            let accessToken = authorization.split(" ")[1].trim();
          
    
            let payload = jwtRepository.verifyAccessToken(accessToken)
            
            if (payload.role != role) return res.status(401).send({message: 'Role is not allowed'})

            let token = tokensRepository.findOne({module_id: payload._id, payload: accessToken})

            if (!token) return res.status(401).send({message: 'access_token is inactive'})

            req.user = await usersRepository.findOne({_id: payload._id})
    
            next()
        }
        catch (err: any) {
            console.log(err)
            if (err.message == 'invalid signature') return res.status(401).send({message: "access_token is invalid"})
            else return res.status(400).send({message: "access_token is required"})
        }

    }
}
