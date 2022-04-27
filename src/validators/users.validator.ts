import BaseValidator from "./base.validator";


export class UsersValidator extends BaseValidator {

    register() {
        return this.validate([
            {
                field: 'password',
                rules: ['required',]
            },
            {
                field: 'fullname',
                rules: ['required']
            },
            {
                field: 'email',
                rules: ['required', 'isEmail', 'unique:User,email']
            },
            {
                field: 'username',
                rules: ['required', 'unique:User']
            }
        ])
    }

    login() {
        return this.validate([
            {
                field: 'username',
                rules: ['required']
            },
            {
                field: 'password',
                rules: ['required']
            }
        ])
    }

    update(){
        return this.validate([
            {
                field: 'email',
                rules: ['required', 'isEmail', 'unique:User,email']
            },
            {
                field: 'fullname',
                rules: ['required']
            }
        ])
    }

}