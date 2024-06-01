import { Express } from 'express';
import userModule from '../components/identity/identity.module';


export default (app : Express) => {
    app.use('/auth', userModule.router);
}