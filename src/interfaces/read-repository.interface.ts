import { FilterQuery } from "mongoose";

export default interface IReadRepository<T> {
    find(item: T): Promise<T[]>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
}