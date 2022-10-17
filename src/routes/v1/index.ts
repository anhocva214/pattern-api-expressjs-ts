import { Router } from 'express';
import UploadRouter from './upload.route';
import UsersRouter from './user.route'




export function RoutersV1(){
    const router = Router();
    new UsersRouter(router);
    new UploadRouter(router);
    return router
}