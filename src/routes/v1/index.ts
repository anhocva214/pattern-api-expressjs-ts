import { Router } from 'express';
import UsersRouter from './user.route'




// Export the base-router
const v1Router = Router();
v1Router.use('/', UsersRouter)




export default v1Router;