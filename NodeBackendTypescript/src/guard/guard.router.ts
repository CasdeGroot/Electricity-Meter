import { Router } from 'express';
import { authController } from '../auth/auth.controller';

export class GuardRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.use(authController.verify);
    }
}

export let guardRouter: GuardRouter = new GuardRouter();