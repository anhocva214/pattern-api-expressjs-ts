import { UserModel } from '@models/user.model';
import { check, validationResult } from 'express-validator'


export class UsersValidator {

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
                    let user = req.user
                    const existingUser = await UserModel.findOne({ email });
                    if (existingUser && existingUser?._id.toString() != user?._id?.toString()) {
                        throw new Error("is_exists");
                    }
                }),
            ,
        ]
    }

}
