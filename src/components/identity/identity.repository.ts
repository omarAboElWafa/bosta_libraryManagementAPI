import { Pool } from "pg";
import  validator   from "validator";
import  dbPool  from "@/core/DataBaseConnection";
import { IRepository } from "@/core/IRepository";
import { IUser, IUserUpdate, User } from "@/contracts/user";
import { comparePassword, generateAuthToken, getInsertStr, getParameterClause} from "../../utils/helpers";
import { hashPassword } from "../../utils/hooks";

class IdentityRepository implements IRepository<IUser> {
    private pool: Pool;
    private tableName: string = 'users';
    constructor(){
        this.pool = dbPool;
    }

    async getAll(): Promise<IUser[]> {
        const query = `SELECT * FROM ${this.tableName}`;
        const { rows } = await this.pool.query(query);
        return rows;
    }

    async getById(id: string): Promise<IUser | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
        const { rows } = await this.pool.query(query, [id]);
        return rows[0] || null;
    }

    async getOneOrManyBy(query: object): Promise<IUser | null> {
        const { parameterClause, valuesArr } = getParameterClause(query);
        const queryStr = `SELECT * FROM ${this.tableName} WHERE ${parameterClause}`;
        const { rows } = await this.pool.query(queryStr, valuesArr);
        return rows[0] || null;
    }

    async create(data: User): Promise<IUser> {
        const { password } = data;
        data.password = await hashPassword(password);
        const { insertStr, valuesArr} = getInsertStr(data);

        const query = `INSERT INTO ${this.tableName} ${insertStr}`;
        const { rows } = await this.pool.query(query, valuesArr);
        return rows[0];
    }

    async update(id: string, data: IUserUpdate): Promise<IUser> {
        const {parameterClause, valuesArr} = getParameterClause(data);
        const query = `UPDATE ${this.tableName} SET ${parameterClause} WHERE id = $4 RETURNING *`;
        const { rows } = await this.pool.query(query, [...valuesArr, id]);
        return rows[0];
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
        await this.pool.query(query, [id]);
    }

    async search(query: IUser): Promise<IUser> {
        const {parameterClause, valuesArr} = getParameterClause(query, 'OR');
        const queryStr = `SELECT * FROM ${this.tableName} WHERE ${parameterClause}`;
        const { rows } = await this.pool.query(queryStr, valuesArr);
        return rows[0];
    }

    // custom methods

}

export default IdentityRepository;