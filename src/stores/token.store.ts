import { Token, TokenModel } from "@models/token.model";
import { BaseStore } from ".";


export default class TokensStore extends BaseStore<Token>{

    constructor(){
        super(TokenModel, Token)
    }
}