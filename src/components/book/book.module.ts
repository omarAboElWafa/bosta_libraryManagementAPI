import BookController from "./book.controller";
import BookService from "./book.service";
import BookRouter from "./book.router";


const bookService = new BookService();
const bookController = new BookController(bookService);
const bookRouter = new BookRouter(bookController);

export default {
    service: bookService,
    controller: bookController,
    router: bookRouter.getRouter()
};