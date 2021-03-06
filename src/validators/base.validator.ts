
import express from 'express';
import { IObjValidate } from './interface';
import Validator from './validator';

export default class BaseValidator {

    protected validate(objValidate: IObjValidate[]) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            let validator = new Validator(req.body, req.lang)
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