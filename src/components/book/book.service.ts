import Book from './book.repository'; 
import { IBook, TBook, IBookUpdate } from '@/contracts/book';
import * as cache from "../../utils/cache";
import { BOOK_EXPIRY_FOR_CACHE } from '../../utils/config';

class BookService {
    private bookRepository: Book;
    constructor(){
        this.bookRepository = new Book();
    }

    async getAll(): Promise<IBook[]> {
        try{
            const books = await this.bookRepository.getAll();
            return books;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async getById(id: string): Promise<IBook | null> {
        try{
            const book = await this.bookRepository.getById(id);
            return book;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async create(data: TBook): Promise<IBook> {
        try{
            const book = await this.bookRepository.create(data);
            return book;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async update(id: string, data: IBookUpdate): Promise<IBook> {
        try{
            const book = await this.bookRepository.update(id, data);
            return book;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await this.bookRepository.delete(id);
        } catch(err){
            throw new Error(err.message);
        }
    }

    async search(query: IBook): Promise<IBook> {
        try{
            const book = await this.bookRepository.search(query);
            return book;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async getAllBooksFromCache(): Promise<IBook[] | null> {
        try{
            const cacheClient = cache.tokenClientPool;
            const books = await cache.getFromCache(cacheClient, 'all-books');
            // turn the stringified data back to an array
            if(books){
                return JSON.parse(books);
            }
            return null;
        } catch(err){
            throw new Error(err.message);
        }
    }
    
    async setAllBooksToCache(books: IBook[]): Promise<void> {
        try{
            const cacheClient = cache.tokenClientPool;
            const stored = JSON.stringify(books);
            await cache.setToCache(cacheClient, 'all-books', stored, BOOK_EXPIRY_FOR_CACHE);
        } catch(err){
            throw new Error(err.message);
        }
    }

    async clearAllBooksFromCache(): Promise<void> {
        try{
            const cacheClient = cache.tokenClientPool;
            await cache.deleteFromCache(cacheClient, 'all-books');
        } catch(err){
            throw new Error(err.message);
        }
    }

}

export default BookService;