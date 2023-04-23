import { Types } from "mongoose";

export default class BaseModel{
    id?: string;
    createdAt: Date;
    updatedAt: Date;
    
    constructor(obj: {
        id?: string;
        createdAt: Date;
        updatedAt: Date;
    }){
        this.id = obj?.id;
        this.createdAt = obj?.createdAt;
        this.updatedAt = obj?.updatedAt;
    }

    preCreate(){
        delete this.id;
        this.createdAt = new Date();
        this.updatedAt = this.createdAt
    }

    preUpdate(){
        this.updatedAt = new Date();
    }
    
}