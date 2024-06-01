import { Request, Response } from "express";
import LoanService from "./loan.service";
import * as helpers from "../../utils/helpers";
import { ILoan, ILoanUpdate, TLoan } from "@/contracts/loan";

class LoanController {
    loanService : LoanService;
    constructor(loanService: LoanService){
        this.loanService = loanService;
    }

    getAllLoans = async (req: Request, res: Response) => {
        try{
            let loans;
            loans = await this.loanService.getAll();
            return res.status(200).json({loans, message: 'Loans fetched successfully'});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    getLoanById = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const loan = await this.loanService.getById(id);
            return res.status(200).json({loan, message: `Loan with id: ${id} is fetched successfully`});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    addLoan = async (req: Request, res: Response) => {
        try{
            const loanData : TLoan = req.body;
            const loan = await this.loanService.create(loanData);
            return res.status(200).json({loan, message: 'Loan created successfully'});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }


    updateLoan = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const loanData : ILoanUpdate = req.body;
            let loan;
            loan = await this.loanService.update(id, loanData);
            return res.json({loan, message: `Loan with id: ${id} is updated successfully`});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }


    deleteLoan = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            await this.loanService.delete(id);
            return res.status(200).json({ message: `Loan with id: ${id} is deleted successfully`});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }


    searchLoan = async (req: Request, res: Response) => {
        try{
            const loanData : ILoan = req.body;
            const loan = await this.loanService.search(loanData);
            return res.status(200).json({loan, message: 'Loan fetched successfully'});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    getDueLoans = async (req: Request, res: Response) => {
        try{
            const loans = await this.loanService.getDueLoans();
            return res.status(200).json({loans, message: 'Due loans fetched successfully'});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    getOverdueLoans = async (req: Request, res: Response) => {
        try{
            const loans = await this.loanService.getOverdueLoans();
            return res.status(200).json({loans, message: 'Overdue loans fetched successfully'});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    getLoansByUser = async (req: Request, res: Response) => {
        try{
            const { user_id } = req.params;
            const loans = await this.loanService.getLoansByUser(user_id);
            return res.status(200).json({loans, message: `Loans fetched successfully for user with id: ${user_id}`});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    getLoansByBook = async (req: Request, res: Response) => {
        try{
            const { book_id } = req.params;
            const loans = await this.loanService.getLoansByBook(book_id);
            return res.status(200).json({loans, message: `Loans fetched successfully for book with id: ${book_id}`});
        } catch(err){
            return res.status(500).json({ message: err.message });
        }
    }


}

export default LoanController;