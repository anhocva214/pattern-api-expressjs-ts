import { User, UserDTO, UserModel } from "@models/user.model";
import { BaseStore } from "."


export default class UsersStore extends BaseStore<User>{

    constructor(){
        super(UserModel, User)
    }
}