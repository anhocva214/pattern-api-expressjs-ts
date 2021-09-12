import { Schema, model } from 'mongoose';



export class User {
    public id: string;
    public username: string;
    public password: string;
    public email: string;
    public fullname: string;
    public gender: number;
    public working_at: string;
    public location: string;
    public about: string;
    public posts: string[]; 
    public comments: string[];
    public access_token: string;

    constructor();
    constructor(user: User);
    constructor(obj?: any) {
        this.id = obj?.id || "";
        this.username = obj?.username || "";
        this.email = obj?.email || "";
        this.password = obj?.password || "";
        this.fullname = obj?.fullname || "";
        this.gender = obj?.gender || -1;
        this.working_at = obj?.working_at || "";
        this.location = obj?.location || "";
        this.about = obj?.about || "";
        this.posts = obj?.posts || [];
        this.comments = obj?.comments || [];
        this.access_token = obj?.access_token || "";

    }
}


const userSchema = new Schema({
    id: { type: String, required: true },
    username: String,
    password: String,
    fullname: String,
    gender: Number,
    email: String,
    working_ad: String,
    location: String,
    about: String,
    posts: [String],
    comments: [String],
    access_token: String,
})

export const UserModel = model('User', userSchema);