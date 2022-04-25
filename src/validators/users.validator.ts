import BaseValidator from "./base.validator";


export class UsersValidator extends BaseValidator {

    register() {
        return this.validate([
            {
                field: 'password',
                rules: [
                    'required'
                ]
            }
        ])
    }

}