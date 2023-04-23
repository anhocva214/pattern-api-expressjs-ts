import { Token, TokenModel } from "@models/token.model";
import { FilterQuery } from "mongoose";


export default class TokensStore{
    async create(data: Token){
        return new Token((await TokenModel.create(data)).toObject())
    }
    async deleteOne(filter: FilterQuery<Token>){
        return TokenModel.deleteOne(filter)
    } 
    async findOne(filter: FilterQuery<Token>){
        let data = (await TokenModel.findOne(filter))?.toObject()
        return data ? new Token(data) : null
    }
}