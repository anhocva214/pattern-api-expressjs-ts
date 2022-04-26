import { Schema, model } from 'mongoose';
import BaseModel from '.';


export class Token extends BaseModel {
    payload: string;
    module_id: string;

    constructor();
    constructor(obj?: Token)
    constructor(obj?: any){
        super(obj);
        this.payload = obj?.payload || '';
        this.module_id = obj?.module_id || '';
    }
}


const tokenSchema = new Schema({
    payload: String,
    module_id: String,
    created_at: String,
    updated_at: String
})

export const TokenModel = model<Token>('Token', tokenSchema);