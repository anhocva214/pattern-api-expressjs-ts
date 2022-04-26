import { Token, TokenModel } from "@models/token.model";
import { BaseRepository } from "."


export default class TokensRepository extends BaseRepository<Token>{

    constructor(){
        super(TokenModel, Token)
    }
}