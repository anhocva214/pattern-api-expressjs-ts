import IObj from "@interfaces/obj.interface";
import IReadRepository from "@interfaces/read-repository.interface";
import IWriteRepository from "@interfaces/write-repository.interface";
import { randomIntNumber } from "@shared/number";
import { FilterQuery, Model, Types } from 'mongoose';
import { ClassificationType } from "typescript";

export abstract class BaseRepository<T> implements IWriteRepository<T>, IReadRepository<T> {

    protected model: Model<T>;
    protected ClassObj: any;

    constructor(model: Model<T>, ClassObj: any) {
        this.model = model;
        this.ClassObj = ClassObj;
    }

    async create(item: T): Promise<T> {
        let timestamp = new Date().getTime()*10000
        let created_at = new Date().toUTCString()
        let doc = await this.model.create({
            ...item, 
            _id: Types.ObjectId(timestamp),
            created_at,
            updated_at: ''
        })
        return new this.ClassObj(doc.toObject())
    }

    update(id: string, item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    find(item: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        let doc = await this.model.findOne(filter)
        if (!!doc){
            return new this.ClassObj(doc.toObject())
        }
        else return null
    }
}