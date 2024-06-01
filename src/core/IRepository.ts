import { PaginationOptions } from '../contracts/pagination';

export interface IRepository<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    getOneBy(query: object): Promise<T | null>;
    create(data: T): Promise<T>;
    update(id: string, data: T): Promise<T>;
    delete(id: string): Promise<void>;
    search(query: T, paginationOpt?: PaginationOptions): Promise<T>;
}