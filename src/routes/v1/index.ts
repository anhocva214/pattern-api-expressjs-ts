import { Router } from 'express';
import UploadRouter from './upload.route';
import UsersRouter from './user.route'




export function RoutersV1(){
    const router = Router();
    new UsersRouter(router).instance();
    new UploadRouter(router).instance();
    return router
}