import { Schema, model } from 'mongoose';



export class User {
    _id?: string;
    username: string;
    password: string;
    email: string;
    fullname: string;
    role: String;

    constructor();
    constructor(user: User);
    constructor(obj?: any) {
        this._id = obj?._id || '';
        this.username = obj?.username || "";
        this.email = obj?.email || "";
        this.password = obj?.password || "";
        this.fullname = obj?.fullname || "";
        this.role = obj?.role || "";
    }
}

export class UserDTO {

}

const userSchema = new Schema({
    username: String,
    password: String,
    fullname: String,
    role: String,
})

export const UserModel = model<User>('User', userSchema);