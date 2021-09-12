import jwt, { SignOptions } from "jsonwebtoken";

import {User} from "@models/user.model";


export class JwtService {

    public static STATUS_VALID = 0;
    public static STATUS_INVALID = 1;
    public static STATUS_EXPIRED = 2;

    async generateJwt(obj: any): Promise<string> {
        const payload = JSON.stringify({
            id: obj?.id,
            username: obj?.username,
            email: obj?.email
        });

        return jwt.sign({
            data: payload
          }, process.env.JWT_SIGNING_KEY as string, { expiresIn: '7d' });
    }

    verifyJwt(token: string){
        let result: any;

        try {
            result = jwt.verify(token, process.env.JWT_SIGNING_KEY as string);
            return JSON.parse(result.data)

        } catch (err) {
            return null
        }

    }
}