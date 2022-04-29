import { TLang } from '@interfaces/trans.interface';
import { IObjValidate } from '@interfaces/validator.interface';
import { User } from '@models/user.model';
import express from 'express';
import Validator from './validator';

// can be reused by many routes

// parallel processing
// const validate = (validations: ValidationChain[]) => {
//     return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//         await Promise.all(validations.map(validation => validation.run(req)));

//         const errors = validationResult(req);
//         if (errors.isEmpty()) {
//             return next();
//         }

//         res.status(400).json({ errors: errors.array() });
//     };
// };

export default class BaseValidator {



    protected validate(objValidate: IObjValidate[]) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            let lang: TLang = req.headers['accept-language']  || 'en' as any
            let validator = new Validator(req.body, lang)
            await validator.validate(objValidate)
            
            let payload : any = {}
            objValidate.forEach(obj => {
                payload[obj.field] = req.body[obj.field]
            })

            req.payloadValidate = payload
            
            if (!validator.hasError()) {
                return next();
            }
            else
                return res.status(422).json({ errors: validator.errors});
        };
    };



}