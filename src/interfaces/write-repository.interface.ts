import { FilterQuery } from "mongoose";

export default interface IWriteRepository<T> {
    create(item: T): Promise<T>;
    updateOne(filter: FilterQuery<T>, item: Object): Promise<void>;
    deleteOne(filter: FilterQuery<T>): Promise<void>;
}