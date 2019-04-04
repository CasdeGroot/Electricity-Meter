import { Router } from 'express';
import { userController } from './user.controller';

export class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', userController.getAll);
        this.router.post('/', userController.post);
        this.router.get('/:id', userController.get);
    }
}

export let userRouter: UserRouter = new UserRouter();
