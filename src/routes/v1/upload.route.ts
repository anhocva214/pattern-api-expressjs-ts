import { UploadController } from '@controllers/upload.controller';
import { Router } from 'express';
import BaseRouter from '../base.route';


export default class UploadRouter extends BaseRouter {
    private controller: UploadController;
    // private validator: UsersValidator;

    constructor(router: Router) {
        super({pathBase: '/uploads', router})
        this.controller = new UploadController();
        // this.validator = new UsersValidator();
    }

    instance() {
        this.router.post(
            this.path('/image'),
            this.controller.upload.fields([{name: 'image'}]),
            this.controller.toDrive.bind(this.controller)
        )
    }
}
