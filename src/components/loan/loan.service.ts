import Loan from './loan.repository'; 
import { ILoan, TLoan, ILoanUpdate } from '@/contracts/loan';
import * as cache from "../../utils/cache";
import { BOOK_EXPIRY_FOR_CACHE } from '../../utils/config';

class LoanService {
    private loanRepository: Loan;
    constructor(){
        this.loanRepository = new Loan();
    }

    async getAll(): Promise<ILoan[]> {
        try{
            const loans = await this.loanRepository.getAll();
            return loans;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async getById(id: string): Promise<ILoan | null> {
        try{
            const loan = await this.loanRepository.getById(id);
            return loan;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async create(data: TLoan): Promise<ILoan> {
        try{
            const loan = await this.loanRepository.create(data);
            return loan;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async update(id: string, data: ILoanUpdate): Promise<ILoan> {
        try{
            const loan = await this.loanRepository.update(id, data);
            return loan;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await this.loanRepository.delete(id);
        } catch(err){
            throw new Error(err.message);
        }
    }

    async search(query: ILoan): Promise<ILoan> {
        try{
            const loan = await this.loanRepository.search(query);
            return loan;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async getAllLoansFromCache(): Promise<ILoan[] | null> {
        try{
            const cacheClient = cache.tokenClientPool;
            const loans = await cache.getFromCache(cacheClient, 'all-loans');
            // turn the stringified data back to an array
            if(loans){
                return JSON.parse(loans);
            }
            return null;
        } catch(err){
            throw new Error(err.message);
        }
    }
    
    async setAllLoansToCache(loans: ILoan[]): Promise<void> {
        try{
            const cacheClient = cache.tokenClientPool;
            const stored = JSON.stringify(loans);
            await cache.setToCache(cacheClient, 'all-loans', stored, BOOK_EXPIRY_FOR_CACHE);
        } catch(err){
            throw new Error(err.message);
        }
    }

    async clearAllLoansFromCache(): Promise<void> {
        try{
            const cacheClient = cache.tokenClientPool;
            await cache.deleteFromCache(cacheClient, 'all-loans');
        } catch(err){
            throw new Error(err.message);
        }
    }

    async getDueLoans(): Promise<ILoan[]> {
        try{
            const loans = await this.loanRepository.getDueLoans();
            return loans;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async getOverdueLoans(): Promise<ILoan[]> {
        try{
            const loans = await this.loanRepository.getOverdueLoans();
            return loans;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async getLoansByUser(user_id: string): Promise<ILoan | ILoan[] | null> {
        try{
            const loans = await this.loanRepository.getOneOrManyBy({user_id});
            return loans;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async getLoansByBook(book_id: string): Promise<ILoan | ILoan[] | null> {
        try{
            const loans = await this.loanRepository.getOneOrManyBy({book_id});
            return loans;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async getLoanByBookIdAndUserId(bookId: string, userId: string): Promise<ILoan | ILoan[] | null> {
        try{
            const loan = await this.loanRepository.getOneOrManyBy({book_id: bookId, user_id: userId});
            return loan;
        } catch(err){
            throw new Error(err.message);
        }
        
    }

    returnBook = async (bookId: string, userId: string): Promise<void> => {
        try{
            const loan = await this.loanRepository.getOneLoan({book_id: bookId, identity_id: userId});
            if(!loan) return;
            const loanId = String(loan.id); 
            await this.loanRepository.returnBook(loanId);
        } catch(err){
            throw new Error(err.message);
        }
    }

    

    
}

export default LoanService;