import { Types } from "mongoose";

export default class BaseModel{
    _id?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    
    constructor(obj: {
        _id?: Types.ObjectId;
        createdAt: Date;
        updatedAt: Date;
    }){
        this._id = obj?._id;
        this.createdAt = obj?.createdAt;
        this.updatedAt = obj?.updatedAt;
    }

    preCreate(){
        delete this._id;
        this.createdAt = new Date();
        this.updatedAt = this.createdAt
    }

    preUpdate(){
        this.updatedAt = new Date();
    }
    
}