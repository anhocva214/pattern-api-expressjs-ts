import { Token, TokenModel } from "@models/token.model";
import { FilterQuery } from "mongoose";


export default class TokensStore{
    create(data: Token){
        return TokenModel.create(data)
    }
    deleteOne(objQuery: FilterQuery<Token>){
        return TokenModel.deleteOne(objQuery)
    } 
    findOne(objQuery: FilterQuery<Token>){
        return TokenModel.findOne(objQuery)
    }
}