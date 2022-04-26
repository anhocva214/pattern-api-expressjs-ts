import { Token, TokenModel } from "@models/token.model";
import { BaseRepository } from "."


export default class TokenRepository extends BaseRepository<Token>{

    constructor(){
        super(TokenModel, Token)
    }
}