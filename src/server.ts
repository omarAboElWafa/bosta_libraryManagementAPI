import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import routes from './loaders/routes';
import { PORT, NODE_ENV} from './utils/config';
import  connectToDB  from './core/DataBaseConnection';


async function startServer() : Promise<void> {
    const app : Express = express();
    
    // Midlewares
    app.use(express.json({limit: "50mb"}));
    app.use(express.urlencoded({ limit:"50mb", extended: true}));
    app.use(cors());
    if(NODE_ENV === 'production'){
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        });
        app.use(limiter);
    }
    // Load routes
    routes(app);

    // Connect to DB
    const dbPool = connectToDB;
    if(dbPool){
        console.log('Database connected successfully');
    }

    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
}


startServer().catch((error) => {
    console.error('Failed to start the server:', error);
  });

