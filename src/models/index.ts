import { Model, DataTypes } from 'sequelize';
export default class BaseModel extends Model{
    id?: string;
    createdAt!: Date;
    updatedAt!: Date;


    preCreate(){
        delete this.id;
        this.createdAt = new Date();
        this.updatedAt = this.createdAt
    }

    preUpdate(){
        this.updatedAt = new Date();
    }
    
}