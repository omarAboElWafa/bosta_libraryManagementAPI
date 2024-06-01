import { Router } from "express";
import { verifyAccessToken, verifyAdminToken } from "../../utils/middlewares";
import LoanController from './loan.controller';

class BookRouter{
    loanController : LoanController;
    constructor(loanController: LoanController){
        this.loanController = loanController;
    }
    getRouter = () => {
        const router = Router();
        router.get('/', this.loanController.getAllLoans);
        router.get('/:id', this.loanController.getLoanById);
        router.post('/', verifyAdminToken, this.loanController.addLoan);
        router.patch('/:id', verifyAdminToken, this.loanController.updateLoan);
        router.delete('/:id', verifyAdminToken, this.loanController.deleteLoan);
        router.get('/due', verifyAdminToken, this.loanController.getDueLoans);
        router.get('/overdue', verifyAdminToken, this.loanController.getOverdueLoans);
        router.get('/user/:userId', verifyAdminToken, this.loanController.getLoansByUser);
        router.get('/book/:bookId', verifyAdminToken, this.loanController.getLoansByBook);
        return router;
    }
}

export default BookRouter;