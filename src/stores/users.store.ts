import { User, UserModel } from "@models/user.model";
import { FilterQuery } from "mongoose";


export default class UsersStore{
    create(data: User){
        return UserModel.create(data)
    }
    getByUsername(username: string){
        return UserModel.findOne({username})
    }  
    getById(id: string){
        return UserModel.findById(id)
    }   
    updateById(id: string, data: any){
        return UserModel.updateOne({_id: id}, data)
    }
    getAll(){
        return UserModel.find({})
    }
}