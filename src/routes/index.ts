import { Router } from 'express';
import UserController from '@controllers/user.controller';
import {adminMiddleware, userMiddleware} from '@middleware/jwt.middleware';
import AdminController from '@controllers/admin.controller';



// User-route
const userRouter = Router();
const userController = new UserController();
userRouter.post('/register', userController.register.bind(userController));
userRouter.post('/login', userController.login.bind(userController));
userRouter.get('/logout', userMiddleware, userController.logout.bind(userController));
userRouter.get('/authenticate', userMiddleware, userController.authenticate.bind(userController));
userRouter.post('/update', userMiddleware, userController.update.bind(userController));


// Admin-route
const adminRouter = Router();
const adminController = new AdminController();
adminRouter.post('/create', adminController.create.bind(adminController));
adminRouter.post('/login', adminController.login.bind(adminController));
adminRouter.get('/authenticate', adminMiddleware, adminController.authenticate.bind(adminController));



// Export the base-router
const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/admin', adminRouter);




export default baseRouter;