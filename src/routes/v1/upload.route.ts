import { UploadController } from '@controllers/upload.controller';
import { Router } from 'express';


export default class UploadRouter {
    private router: Router;
    private controller: UploadController;
    private pathBase: string;
    // private validator: UsersValidator;

    constructor(router: Router) {
        this.router = router;
        this.controller = new UploadController();
        this.pathBase = '/uploads';
        // this.validator = new UsersValidator();
        this.instance()
    }

    path(p: string) {
        return this.pathBase + p
    }

    instance() {
        this.router.post(
            this.path('/image'),
            this.controller.upload.fields([{name: 'image'}]),
            this.controller.toDrive.bind(this.controller)
        )
    }
}
