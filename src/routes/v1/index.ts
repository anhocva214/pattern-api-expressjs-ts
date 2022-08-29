import { Router } from 'express';
import UsersRouter from './user.route'




export function RoutersV1(){
    const router = Router();
    new UsersRouter(router);

    return router
}