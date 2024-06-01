import { Router } from "express";
import { verifyAccessToken, verifyRefreshToken, verifyAdminToken } from "../../utils/middlewares";
import IdentityController from './book.controller';

class BookRouter{
    bookController : IdentityController;
    constructor(bookController: IdentityController){
        this.bookController = bookController;
    }
    getRouter = () => {
        const router = Router();
        router.get('/', this.bookController.getAllBooks);
        router.get('/:id', this.bookController.getBookById);
        router.post('/', verifyAdminToken, this.bookController.addBook);
        router.patch('/:id', verifyAdminToken, this.bookController.updateBook);
        router.delete('/:id', verifyAdminToken, this.bookController.deleteBook);
        router.post('/:id/checkout', verifyAccessToken, this.bookController.borrowBook);
        router.post('/:id/checkin', verifyAccessToken, this.bookController.returnBook);
        router.get('/search', this.bookController.searchBooks);

        return router;
    }
}

export default BookRouter;