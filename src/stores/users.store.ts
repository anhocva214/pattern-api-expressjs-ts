import { User, UserModel } from "@models/user.model";
import { FilterQuery } from "mongoose";


export default class UsersStore{
    async create(data: User){
        return new User((await UserModel.create(data)).toObject())
    }
    async getBy(filter: FilterQuery<User>){
        let data = (await UserModel.findOne(filter))?.toObject()
        return data ? new User(data) : null
    }  
    async getById(id: string){
        let data = (await UserModel.findOne({_id: id}))?.toObject()
        return data ? new User(data) : null
    }   
    async updateById(id: string, data: any){
        return await UserModel.updateOne({_id: id}, data)
    }
    async getAll(){
        let data = await UserModel.find({})
        return data.map(item => new User(item.toObject()))
    }
}