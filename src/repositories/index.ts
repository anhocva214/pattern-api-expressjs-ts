import IObj from "@interfaces/obj.interface";
import IReadRepository from "@interfaces/read-repository.interface";
import IWriteRepository from "@interfaces/write-repository.interface";
import { randomIntNumber } from "@shared/number";
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { ClassificationType } from "typescript";
import moment from "moment";

export abstract class BaseRepository<T> implements IWriteRepository<T>, IReadRepository<T> {

    protected model: Model<T>;
    protected ClassObj: any;

    constructor(model: Model<T>, ClassObj: any) {
        this.model = model;
        this.ClassObj = ClassObj;
    }

    async create(item: T): Promise<T> {
        let timestamp = moment.utc().valueOf()
        let created_at = timestamp
        let doc = await this.model.create({
            ...item, 
            _id: Types.ObjectId(timestamp),
            created_at,
            updated_at: ''
        })
        return new this.ClassObj(doc.toObject())
    }

    async updateOne(filter: FilterQuery<T>, item: UpdateQuery<T>): Promise<void> {
        await this.model.updateOne(filter, item)
    }

    async deleteOne(filter: FilterQuery<T>): Promise<void> {
        await this.model.deleteOne(filter)
    }

    async find(filter: FilterQuery<T>): Promise<T[]> {
        let doc = await this.model.find(filter)
        return doc.map(item => new this.ClassObj(item))
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        let doc = await this.model.findOne(filter)
        if (!!doc){
            return new this.ClassObj(doc.toObject())
        }
        else return null
    }

}