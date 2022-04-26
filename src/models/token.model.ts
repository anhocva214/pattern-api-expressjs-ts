import { Schema, model } from 'mongoose';
import BaseModel from '.';


export class Token extends BaseModel {
    payload: string;
    expires_in: number;
    module_id: string;

    constructor();
    constructor(obj?: Token)
    constructor(obj?: any){
        super(obj);
        this.payload = obj?.payload || '';
        this.module_id = obj?.module_id || '';
        this.expires_in  = obj?.expires_in || 0;
    }
}


const tokenSchema = new Schema({
    payload: String,
    expires_in: Number,
    module_id: String,
    created_at: String,
    updated_at: String
})

export const TokenModel = model<Token>('Token', tokenSchema);