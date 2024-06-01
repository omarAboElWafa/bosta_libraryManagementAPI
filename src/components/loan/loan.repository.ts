import { Pool } from "pg";
import  dbPool  from "@/core/DataBaseConnection";
import { IRepository } from "@/core/IRepository";
import { ILoan, ILoanUpdate, TLoan } from "@/contracts/loan";
import { getInsertStr, getParameterClause} from "../../utils/helpers";

class LoanRepository implements IRepository<ILoan> {
    private pool: Pool;
    private tableName: string = 'loans';
    constructor(){
        this.pool = dbPool;
    }

    async getAll(): Promise<ILoan[]> {
        const query = `SELECT * FROM ${this.tableName}`;
        const { rows } = await this.pool.query(query);
        return rows;
    }

    async getById(id: string): Promise<ILoan | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
        const { rows } = await this.pool.query(query, [id]);
        return rows[0] || null;
    }

    async getOneOrManyBy(query: object): Promise<ILoan | ILoan[] | null> {
        const { parameterClause, valuesArr } = getParameterClause(query);
        const queryStr = `SELECT * FROM ${this.tableName} WHERE ${parameterClause}`;
        const { rows } = await this.pool.query(queryStr, valuesArr);
        return rows[0] || null;
    }

    async create(data: TLoan): Promise<ILoan> {
        const {insertStr, valuesArr} = getInsertStr(data);
        const query = `INSERT INTO ${this.tableName} ${insertStr}`;
        const { rows } = await this.pool.query(query, valuesArr);
        return rows[0];
    }

    async update(id: string, data: ILoanUpdate): Promise<ILoan> {
        const {parameterClause, valuesArr} = getParameterClause(data);
        const query = `UPDATE ${this.tableName} SET ${parameterClause} WHERE id = $4 RETURNING *`;
        const { rows } = await this.pool.query(query, [...valuesArr, id]);
        return rows[0];
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
        await this.pool.query(query, [id]);
    }

    async search(query: ILoan): Promise<ILoan> {
        const {parameterClause, valuesArr} = getParameterClause(query, 'OR');
        const queryStr = `SELECT * FROM ${this.tableName} WHERE ${parameterClause}`;
        const { rows } = await this.pool.query(queryStr, valuesArr);
        const allLoans = rows[0];
        // pagination logic

        return rows[0];
    }

    // custom methods
    getDueLoans = async (): Promise<ILoan[]> => {
        const query = `SELECT * FROM ${this.tableName} WHERE due_date < NOW()`;
        const { rows } = await this.pool.query(query);
        return rows;
    }

    getOverdueLoans = async (): Promise<ILoan[]> => {
        const query = `SELECT * FROM ${this.tableName} WHERE due_date < NOW() AND returned_date IS NULL`;
        const { rows } = await this.pool.query(query);
        return rows;
    }

    getOneLoan = async (query: object): Promise<ILoan | null> => {
        const { parameterClause, valuesArr } = getParameterClause(query);
        const queryStr = `SELECT * FROM ${this.tableName} WHERE ${parameterClause}`;
        const { rows } = await this.pool.query(queryStr, valuesArr);
        return rows[0] || null;
    }

    returnBook = async (id: string): Promise<ILoan> => {
        const query = `UPDATE ${this.tableName} SET returned_date = NOW() WHERE id = $1 RETURNING *`;
        const { rows } = await this.pool.query(query, [id]);
        return rows[0];
    }
}

export default LoanRepository;