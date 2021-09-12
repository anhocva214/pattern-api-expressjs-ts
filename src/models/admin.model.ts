import { Schema, model } from 'mongoose';



export class Admin {
    public id: string;
    public username: string;
    public password: string;
    public access_token: string;

    constructor();
    constructor(user: Admin);
    constructor(obj?: any) {
        this.id = obj?.id || "";
        this.username = obj?.username || "";
        this.password = obj?.password || "";
        this.access_token = obj?.access_token || "";

    }
}


const adminSchema = new Schema({
    id: { type: String, required: true },
    username: String,
    password: String,
    access_token: String,
})

export const AdminModel = model('Admin', adminSchema);