import { Router } from 'express';
import { authController } from './auth.controller';
import {userController} from "../user/user.controller";

export class AuthRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.post('/', authController.authenticate);
        this.router.post('/sensor/', authController.linkSensor);
        this.router.post('/createAccount/', userController.post);
    }
}

export let authRouter: AuthRouter = new AuthRouter();