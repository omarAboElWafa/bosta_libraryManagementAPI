import { Request, Response } from "express";
import bookService from "./book.service";
import * as helpers from "../../utils/helpers";
import { IBook, IBookUpdate, Book } from "@/contracts/book";

class BookController {
    bookService : bookService;
    constructor(bookService: bookService){
        this.bookService = bookService;
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
            const bookData : Book = req.body;
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
            const { user } = req.body;
            const book = await this.bookService.borrowBook(id, user);
            if(!book) return res.status(400).json({message: 'Book not available'});
            return res.status(200).json({book, message: `Book with id: ${id} is borrowed successfully`});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }

    returnBook = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const { user } = req.body;
            const book = await this.bookService.returnBook(id, user);
            if(!book) return res.status(400).json({message: 'Book not borrowed by user'});
            return res.status(200).json({book, message: `Book with id: ${id} is returned successfully`});
        }
        catch(err){
            return res.status(500).json({ message: err.message });
        }
    }


}

export default BookController;