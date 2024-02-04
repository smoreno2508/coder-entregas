import  express from "express";
import cors from "cors";
import { Server as SocketIOServer } from 'socket.io';
import { engine } from 'express-handlebars';
import { config } from "dotenv";
import passport from "../middleware/Passport.js";
import cookieParser from "cookie-parser";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dbConnection from "../config/Database.js";
import { __dirname } from "../helpers/utils.js";
import mainRouter from "../routes/index.js";
import errorHandler from "../middleware/error/ErrorHandleMiddleware.js";
import SocketManager from "../sockets/SocketManager.js";
import { buildLogger } from "../helpers/logger.js";
import loggerMiddleware from "../middleware/loggerMiddleware.js";

const logger = buildLogger("Server");
config();

export default class Server {
    
    constructor(productService, messageService, cartService){
        this.app = express();
        this.productService = productService;
        this.messageService = messageService;
        this.cartService = cartService;
        this.PORT = process.env.PORT;
        this.connetDB();
        this.middlewares();
        this.handlebars();
        this.routes();
        this.errorHandler();
    }

    async connetDB(){
      await dbConnection();
    }

    middlewares(){
        this.app.use(cors({
            credentials: true,
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static(__dirname + '/public'));
        this.app.use(cookieParser(process.env.COOKIE_SECRET));
        this.app.use(passport.initialize());
        this.app.use(session({
            store: new MongoStore({ mongoUrl: process.env.MONGODB_ATLAS}),
            secret: process.env.SESSION_SECRET,
            cookie: { maxAge: 120000 },
            resave: false,
            saveUninitialized: false,
        }));
        this.app.use(passport.session());
        this.app.use(loggerMiddleware);
    }

    handlebars(){
        this.app.engine('hbs', engine({ 
            helpers: {
                eq: (v1, v2) => v1 == v2 ,
                or: (v1, v2) => v1 || v2,
                multiply: (v1, v2) => v1 * v2,
                calculateTotal: (products) => products.reduce((acc, product) => acc + (product.product.price * product.quantity), 0),
                formatDate: (date, locale = 'es-CL') => new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(date))
            },
            extname: 'hbs',
            partialsDir: __dirname + '/views/partials'
        }));
        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'hbs');
    }

    routes(){
        this.app.use('/', mainRouter);
    }

    errorHandler(){
        this.app.use(errorHandler);
    }

    start(){
        this.httpServer = this.app.listen(this.PORT, () => {
            logger.debug(`Server running on port ${this.PORT}`);
        });

        this.io = new SocketIOServer(this.httpServer);
        new SocketManager(this.io, this.productService, this.messageService, this.cartService);
    }


}