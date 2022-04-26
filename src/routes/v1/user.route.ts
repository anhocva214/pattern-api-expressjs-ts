import { Router } from 'express';
import UserController from '@controllers/user.controller';
import { UsersValidator } from '@validators/users.validator';
import middleware from '@middleware/jwt.middleware';




class UsersRouter {
    private router: Router;
    private controller: UserController;
    private pathBase: string;
    private validator: UsersValidator;

    constructor(){
        this.router = Router();
        this.controller = new UserController();
        this.pathBase = '/users';
        this.validator = new UsersValidator();
    }

    path(p: string){
        return this.pathBase + p
    }

    instance(){
        this.router.post(
            this.path('/register'), 
            this.validator.register(),
            this.controller.register.bind(this.controller)
        )
        this.router.post(
            this.path('/login'),
            this.validator.login(),
            this.controller.login.bind(this.controller)
        )
        this.router.get(
            this.path('/authenticate'),
            middleware('user'),
            this.controller.authenticate.bind(this.controller)
        )
    }

    getRouter(){
        return this.router
    }
}


const userRouter = new UsersRouter();
userRouter.instance()

export default userRouter.getRouter();