import { User } from "@models/user.model";
import { Env } from "@shared/constants";
import jwt, { JwtPayload } from 'jsonwebtoken'

export default class JwtRepository {
    private secret: string;

    constructor() {
        this.secret = Env.JWT_SIGNING_KEY || '';
    }

    login(user: User, expiresIn: number) {
        return jwt.sign({
            data: {
                _id: user._id,
                role: user.role
            }
        }, this.secret, { expiresIn });
    }

    verifyAccessToken(token: string): {
        _id: string,
        role: string
    }{
        let payload = jwt.verify(token, this.secret) as JwtPayload;
        return payload.data
    }

}