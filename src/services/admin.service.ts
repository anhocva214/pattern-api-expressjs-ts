import {Admin, AdminModel} from '@models/admin.model';


export default class UserService{

    private model: typeof AdminModel;

    constructor(){
        this.model = AdminModel;
    }

    async create(admin: Admin): Promise<void>{
        await this.model.create(admin, (err, data) => {
            if (err) console.log("AdminService -> create: ", err)
        })
    }

    async getList(): Promise<Admin[]>{
        let admins : Admin[] = await this.model.find();
        return admins
    }

    async delete(id: string): Promise<void>{
        await this.model.deleteOne({id})
    }

    async update(user: Admin): Promise<void>{
        await this.model.updateOne({id: user.id}, user)
    }

    async isExists(objQuery: object): Promise<boolean>{
        let query : Admin[] = await this.model.findOne(objQuery);
        if (!!query) return true
        else return false
    }

    async findOne(objQuery: object): Promise<Admin>{
        let user: Admin = await this.model.findOne(objQuery);
        return user
    }

}