import BaseValidator from "./base.validator";
import {body, check} from 'express-validator'


export class UsersValidator extends BaseValidator {

    register() {
        return this.validate([
            body(['username', 'fullname', 'password'])
            .not()
            .isEmpty(),
            body('email').isEmail(),
        ])
    }

}