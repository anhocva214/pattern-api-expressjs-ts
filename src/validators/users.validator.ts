import BaseValidator from "./base.validator";


export class UsersValidator extends BaseValidator {

    register() {
        return this.validate([
            {
                field: 'password',
                rules: [
                    'required'
                ]
            },
            {
                field: 'fullname',
                rules: [
                    'required'
                ]
            },
            {
                field: 'email',
                rules: [
                    'required'
                ]
            },
            {
                field: 'username',
                rules: [
                    'required'
                ]
            }
        ])
    }

}