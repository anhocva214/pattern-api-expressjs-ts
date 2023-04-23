import { User, UserModel } from '@models/user.model';
import UsersStore from '@stores/users.store';
import { check, validationResult } from 'express-validator'


export class UsersValidator {
    private userStore: UsersStore

    constructor(){
        this.userStore = new UsersStore()
    }

    register() {
        return [
            check('fullname')
                .not().isEmpty().withMessage('is_required')
            ,
            check('username')
                .not().isEmpty().withMessage('is_required')
            ,
            check('email')
                .not().isEmpty().withMessage('is_required')
                .isEmail().withMessage('is_not_format')
                .trim()
                .normalizeEmail()
                .custom(async (email: string) => {
                    const existingUser = await UserModel.findOne({ email });
                    if (existingUser) {
                        throw new Error("is_exists");
                    }
                }),
            ,
            check('password')
                .not().isEmpty().withMessage('is_required')
        ]
    }

    login() {
        return [
            check('username')
                .not().isEmpty().withMessage('is_required')
            ,
            check('password')
                .not().isEmpty().withMessage('is_required')
        ]
    }

    update() {
        return [
            check('fullname')
                .not().isEmpty().withMessage('is_required')
                .normalizeEmail()
                
            ,
            check('email')
                .not().isEmpty().withMessage('is_required')
                .isEmail().withMessage('is_not_format')
                .trim()
                .normalizeEmail()
                .custom(async (email: string, {req}) => {
                    let user = new User(req.user)
                    const existingUser = await this.userStore.getById(user?.id || '')
                    if (existingUser && existingUser?.id != user?.id) {
                        throw new Error("is_exists");
                    }
                }),
            ,
        ]
    }

}
