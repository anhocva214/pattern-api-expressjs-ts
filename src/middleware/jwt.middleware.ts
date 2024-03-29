import JwtService from "@services/jwt.service";
import logger from "@services/logger.service";
import TokensStore from "@stores/token.store";
import UsersStore from "@stores/users.store";
import { NextFunction, Request, Response } from "express";
import StatusCode from "http-status-codes";
const { UNAUTHORIZED } = StatusCode;

const jwtService = new JwtService()
const tokensStore = new TokensStore()
const usersStore = new UsersStore()

export default function middleware(role: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        let authorization: string = req.headers.authorization as string;
        let accessToken = authorization?.split(" ")?.[1]?.trim();
        try {
            let payload = jwtService.verifyAccessToken(accessToken)

            // Check role
            if (!!role && payload.role != role) return res.status(403).send({ message: 'Role is not allowed' })

            let token = await tokensStore.findOne({ module_id: payload._id, payload: accessToken })

            if (!token) return res.status(401).send({ message: 'access_token is inactive' })

            let user = await usersStore.getById( payload._id)
            if (!user){
                return res.status(401).send({ message: 'user is deleted' })
            }

            req.user = user
            req.tokenId = token?.id;

            next()
        }
        catch (err: any) {
            logger.error(err)
            if (err.message == 'jwt expired') {
                await tokensStore.deleteOne({ payload: accessToken })
                return res.status(419).send({ message: "access_token is expired" })
            }
            else if (err.message == 'jwt must be provided'){
                return res.status(422).send({ message: "access_token must be provided" })
            }
            else if (err.message == 'invalid signature') return res.status(403).send({ message: "access_token is invalid" })
            else return res.status(422).send({ message: "access_token is required" })
        }

    }
}
