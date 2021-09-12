import {User, UserModel} from '@models/user.model';


export default class UserService{

    private userModel: typeof UserModel;

    constructor(){
        this.userModel = UserModel;
    }

    async create(user: User): Promise<void>{
        await this.userModel.create(user, (err, data) => {
            if (err) console.log("UserService -> create: ", err)
        })
    }

    async getList(): Promise<User[]>{
        let users : User[] = await this.userModel.find();
        return users
    }

    async delete(id: string): Promise<void>{
        await this.userModel.deleteOne({id})
    }

    async update(user: User): Promise<void>{
        await this.userModel.updateOne({id: user.id}, user)
    }

    async isExists(objQuery: object): Promise<boolean>{
        let query : User[] = await this.userModel.findOne(objQuery);
        if (!!query) return true
        else return false
    }

    async findOne(objQuery: object): Promise<User>{
        let user: User = await this.userModel.findOne(objQuery);
        return user
    }

}