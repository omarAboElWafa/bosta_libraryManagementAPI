import { Express } from 'express';
import userModule from '../components/identity/identity.module';
import bookModule from '../components/book/book.module';

export default (app : Express) => {
    app.use('/auth', userModule.router);
    app.use('/books', bookModule.router);
}