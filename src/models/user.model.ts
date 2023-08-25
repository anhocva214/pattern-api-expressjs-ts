import { Schema, model } from 'mongoose';
import BaseModel from '.';


export type TUserRole = "user" | "admin"

export class User extends BaseModel{
    email: string;
    password: string;
    fullname: string;
    role: TUserRole;

    constructor();
    constructor(user: User);
    constructor(obj?: any) {
        super(obj);
        this.email = obj?.email || "";
        this.password = obj?.password || "";
        this.fullname = obj?.fullname || "";
        this.role = obj?.role || "";
    }
}


const userSchema = new Schema({
    password: String,
    fullname: String,
    email: String,
    role: String,
    createdAt: String,
    updatedAt: String
})

userSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id?.toString();
        delete ret._id;
    }
});

export const UserModel = model<User>('User', userSchema, 'User');