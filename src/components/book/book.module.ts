import BookController from "./book.controller";
import BookService from "./book.service";
import LoanService from "../loan/loan.service";
import BookRouter from "./book.router";

const loanService = new LoanService();
const bookService = new BookService();
const bookController = new BookController(bookService, loanService);
const bookRouter = new BookRouter(bookController);

export default {
    service: bookService,
    controller: bookController,
    router: bookRouter.getRouter()
};