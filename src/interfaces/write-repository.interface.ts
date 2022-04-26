import { FilterQuery } from "mongoose";

export default interface IWriteRepository<T> {
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<boolean>;
    deleteOne(filter: FilterQuery<T>): Promise<void>;
}