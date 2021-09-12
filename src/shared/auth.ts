import JWT from 'jsonwebtoken';
import {SecretJWT} from './constants';
import {NextFunction, Request, Response} from 'express'
import StatusCodes from 'http-status-codes';
const { UNAUTHORIZED} = StatusCodes;
import CryptoJS from 'crypto-js'


export const HashMD5 = (data: any)=>{
    return CryptoJS.MD5(data)
}

// export const AuthAPIs = async (req: Request, res: Response, next: NextFunction)=>{
//     // console.log(req.headers)
//     let token : any = req.headers.token;
//     let dataToken : any = DecodeToken(token);
//     if (!!dataToken){
//         let username : string = dataToken.data.username;
//         let account : any = await GetOne(username);
        
//         if (!account){
//             return res.status(UNAUTHORIZED).send({message: "Invalid token"})
//         }
//         else if (account.token != token){
//             return res.status(UNAUTHORIZED).send({message: "Invalid token"})
//         }
//         else{
//             next();
//         }
//     }
//     else{
//         return res.status(UNAUTHORIZED).send({message: "Invalid token"})
//     }
    
// }