import { Router } from 'express';
import UserController from '@controllers/user.controller';




class UsersRouter {
    private router: Router;
    private controller: UserController;
    private pathBase: string;

    constructor(){
        this.router = Router();
        this.controller = new UserController();
        this.pathBase = '/users';
    }

    path(p: string){
        return this.pathBase + p
    }

    instance(){
        this.router.post(this.path('/register'), this.controller.register.bind(this.controller))
    }

    getRouter(){
        return this.router
    }
}


const userRouter = new UsersRouter();
userRouter.instance()

export default userRouter.getRouter();