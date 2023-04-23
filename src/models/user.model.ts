import { Schema, model } from 'mongoose';
import BaseModel from '.';



export class User extends BaseModel{
    username: string;
    password: string;
    email: string;
    fullname: string;
    role: String;

    constructor();
    constructor(user: User);
    constructor(obj?: any) {
        super(obj);
        this.username = obj?.username || "";
        this.email = obj?.email || "";
        this.password = obj?.password || "";
        this.fullname = obj?.fullname || "";
        this.role = obj?.role || "";
    }
}


const userSchema = new Schema({
    username: String,
    password: String,
    fullname: String,
    email: String,
    role: String,
    created_at: String,
    updated_at: String
})

userSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id?.toString();
        delete ret._id;
    }
});

export const UserModel = model<User>('User', userSchema, 'User');