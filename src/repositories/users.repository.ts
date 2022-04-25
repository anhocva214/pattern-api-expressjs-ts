import { User, UserDTO, UserModel } from "@models/user.model";
import { model } from "mongoose";
import { BaseRepository } from "."


export default class UsersRepository extends BaseRepository<User>{

    constructor(){
        super(UserModel, User)
    }
}