import { Pool } from "pg";
import  dbPool  from "@/core/DataBaseConnection";
import { IRepository } from "@/core/IRepository";
import { IBook, IBookUpdate, TBook } from "@/contracts/book";
import { getInsertStr, getParameterClause} from "../../utils/helpers";

class BookRepository implements IRepository<IBook> {
    private pool: Pool;
    private tableName: string = 'books';
    constructor(){
        this.pool = dbPool;
    }

    async getAll(): Promise<IBook[]> {
        const query = `SELECT * FROM ${this.tableName}`;
        const { rows } = await this.pool.query(query);
        return rows;
    }

    async getById(id: string): Promise<IBook | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
        const { rows } = await this.pool.query(query, [id]);
        return rows[0] || null;
    }

    async getOneOrManyBy(query: object): Promise<IBook | null> {
        const { parameterClause, valuesArr } = getParameterClause(query);
        const queryStr = `SELECT * FROM ${this.tableName} WHERE ${parameterClause}`;
        const { rows } = await this.pool.query(queryStr, valuesArr);
        return rows[0] || null;
    }

    async getOneBy(query: object): Promise<IBook | null> {
        const { parameterClause, valuesArr } = getParameterClause(query);
        const queryStr = `SELECT * FROM ${this.tableName} WHERE ${parameterClause}`;
        const { rows } = await this.pool.query(queryStr, valuesArr);
        return rows[0] || null;
    }

    async create(data: TBook): Promise<IBook> {
        const { title, author, available_quantity, isbn, shelf_location } = data;
        const {insertStr, valuesArr} = getInsertStr(data);
        const query = `INSERT INTO ${this.tableName} ${insertStr}`;
        const { rows } = await this.pool.query(query, valuesArr);
        return rows[0];
    }

    async update(id: string, data: IBookUpdate): Promise<IBook> {
        const {parameterClause, valuesArr} = getParameterClause(data);
        const query = `UPDATE ${this.tableName} SET ${parameterClause} WHERE id = $4 RETURNING *`;
        const { rows } = await this.pool.query(query, [...valuesArr, id]);
        return rows[0];
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
        await this.pool.query(query, [id]);
    }

    async search(query: IBook): Promise<IBook> {
        const {parameterClause, valuesArr} = getParameterClause(query, 'OR');
        const queryStr = `SELECT * FROM ${this.tableName} WHERE ${parameterClause}`;
        const { rows } = await this.pool.query(queryStr, valuesArr);
        const allBooks = rows[0];
        // pagination logic

        return rows[0];
    }

    // custom methods

}

export default BookRepository;