import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';


import {connectDB} from '@config/db.config'
import Logger from '@services/logger.service';
import { TLang } from '@resources/i18n/interface';
import { RoutersV1 } from './routes/v1';
import { AppError } from '@models/error';

const logger = new Logger()
connectDB()
    .then(() => logger.info("Connect database success"))
    .catch(err => logger.errorApp({
        where: "connectDB",
        detail: err
    }))

const app = express();
const { BAD_REQUEST } = StatusCodes;





/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}


declare module "express" {
    export interface Request {
        user?: any;
        tokenId?: string;
        payloadValidate?: any;
        lang?: TLang
    }
}

// Handle accept language
function handleLanguage(req: Request, res: Response, next: NextFunction){
    let lang = req.headers['accept-language'] as any
    if (lang != 'vi' && lang != 'en') lang = 'en'
    req.lang = lang;
    next()
}
app.use(handleLanguage)


// Add APIs
app.use('/v1', RoutersV1());

app.use((err: AppError | any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        switch (err.constructor) {
            case AppError:
                err.translate(getLocaleFromRequest(req))
                res.json(err)
                break
            default:
                res.json({ message: 'System Error', detail: err.message })
                break
        }
    }
    next()
})

function getLocaleFromRequest(req: Request) {
    const locale = req.headers['accept-language']
    if (locale === 'en') return 'en'
    return 'vi'
}


/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
