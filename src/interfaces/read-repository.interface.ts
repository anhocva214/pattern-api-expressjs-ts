export default interface IReadRepository<T> {
    find(item: T): Promise<T[]>;
    findOne(id: string): Promise<T>;
}