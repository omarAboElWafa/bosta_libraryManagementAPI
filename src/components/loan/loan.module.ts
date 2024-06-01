import BookController from "./loan.controller";
import BookService from "./loan.service";
import BookRouter from "./loan.router";


const bookService = new BookService();
const bookController = new BookController(bookService);
const bookRouter = new BookRouter(bookController);

export default {
    service: bookService,
    controller: bookController,
    router: bookRouter.getRouter()
};