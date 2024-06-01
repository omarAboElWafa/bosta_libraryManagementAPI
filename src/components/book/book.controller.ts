import { Request, Response } from "express";
import bookService from "./book.service";
import LoanService from "../loan/loan.service";
import * as helpers from "../../utils/helpers";
import { IBook, IBookUpdate, TBook } from "@/contracts/book";
import { TLoan } from "@/contracts/loan";
import { isArray } from "util";

class BookController {
    bookService : bookService;
    loanService : LoanService;
    constructor(bookService: bookService, loanService: LoanService){
        this.bookService = bookService;
        this.loanService = loanService;
    }

    getAllBooks = async (req: Request, res: Response) => {
        try{
            let books;
            books = await this.bookService.getAllBooksFromCache();
            if(!books){
                books = await this.bookService.getAll();
            }
            return res.status(200).json({books, message: 'Books fetched successfully'});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    getBookById = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const book = await this.bookService.getById(id);
            return res.status(200).json({book, message: `Book with id: ${id} is fetched successfully`});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    addBook = async (req: Request, res: Response) => {
        try{
            const bookData : TBook = req.body;
            const book = await this.bookService.create(bookData);
            // clear cache after adding new book
            if(book) await this.bookService.clearAllBooksFromCache();
            return res.status(200).json({book, message: 'Book created successfully'});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    updateBook = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const bookData : IBookUpdate = req.body;
            let book;
            book = await this.bookService.update(id, bookData);
            // clear cache after updating book
            if(book) await this.bookService.clearAllBooksFromCache();
            return res.json({book, message: `Book with id: ${id} is updated successfully`});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    deleteBook = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            await this.bookService.delete(id);
            return res.status(200).json({message: `Book with id: ${id} is deleted successfully`});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    searchBooks = async (req: Request, res: Response) => {
        try{
            const query : IBook = req.body;
            const book = await this.bookService.search(query);
            if(!book) return res.status(200).json({message: 'No books found'});
            return res.status(200).json({book, message: 'Books fetched successfully'});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    borrowBook = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const { userId, dueDate } = req.body;
            const book = await this.bookService.getById(id);
            // check if book is available
            if(!book) return res.status(404).json({message: 'Book not found'});
            if(book.available_quantity === 0) return res.status(400).json({message: 'Book not available'});
            // borrow book
            // check if the due date is valid (max 14 days from today)
            if(!helpers.isValidDueDate(dueDate)) return res.status(400).json({message: 'Invalid due date. Due date should be within 14 days from today'});
            
            const loanData: TLoan = {
                book_id: book.id,
                identity_id: userId,
                checkout_date: new Date().toDateString(),
                due_date: dueDate
            };
            const loan = await this.loanService.create(loanData);
            if(!loan) return res.status(500).json({message: 'Failed to borrow book, Please try again later'});
            // update book quantity
            book.available_quantity -= 1;
            await this.bookService.update(id, book);
            return res.status(200).json({book, message: `Book with id: ${id} is borrowed successfully`});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    returnBook = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const { userId } = req.body;
            const book = await this.bookService.getById(id);
            if(!book) return res.status(404).json({message: 'Book not found'});

            // check if book is borrowed by this user
            const loan = await this.loanService.getLoanByBookIdAndUserId(id, userId);
            if(!loan) return res.status(400).json({message: 'Book is not borrowed by this user'});
            // return book logic
            const loanId = Array.isArray(loan) ? loan[0].id : loan.id;
            await this.loanService.returnBook(String(loanId), userId);
            // update book quantity
            book.available_quantity += 1;
            await this.bookService.update(id, book);
            return res.status(200).json({book, message: `Book with id: ${id} is returned successfully`});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }


}

export default BookController;