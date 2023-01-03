import { Router } from 'express';
import UserController from '@controllers/user.controller';
import { UsersValidator } from '@validators/users.validator';
import middleware from '@middleware/jwt.middleware';
import rateLimit from 'express-rate-limit'
import BaseRouter from '../base.route';

const apiLimiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 5, // Limit each IP to 5 requests per `window` (here, per 2 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})



export default class UsersRouter extends BaseRouter {
    private controller: UserController;
    private validator: UsersValidator;

    constructor(router: Router){
        super({pathBase: '/users', router})
        this.controller = new UserController();
        this.validator = new UsersValidator();
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
        this.router.get(
            this.path('/logout'),
            middleware('user'),
            this.controller.logout.bind(this.controller)
        )
        this.router.put(
            this.path('/'),
            middleware('user'),
            this.validator.update(),
            this.controller.update.bind(this.controller)
        )
        this.router.get(
            this.path('/me'),
            middleware('user'),
            this.controller.myInfo.bind(this.controller)
        )
        this.router.get(
            this.path('/all'),
            apiLimiter,
            this.controller.getAll.bind(this.controller)
        )
    }
}
