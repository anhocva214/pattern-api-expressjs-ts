import { User, UserDTO, UserModel } from "@models/user.model";
import { BaseRepository } from "."


export default class UsersRepository extends BaseRepository<User>{

    constructor(){
        super(UserModel, User)
    }
}