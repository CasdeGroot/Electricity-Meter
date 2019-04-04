import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { userRouter } from './user/user.router';
import { DatabaseConnector } from './database/database.connector';
import { authRouter } from './auth/auth.router';
import { guardRouter } from './guard/guard.router';
import { MqttConnector } from './mqtt/mqtt.connector';
import { measurementRouter } from './measurement/measurement.router';

const config = require('../config');
// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        mongoose.set('debug', true);
        this.express = express();
        this.middleware();
        this.routes();
        DatabaseConnector.connect(config['db-connection-string'] + '/' + config['db-name']);
        MqttConnector.connect();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/api', guardRouter.router);
        this.express.use('/authenticate', authRouter.router);
        this.express.use('/api/user', userRouter.router);
        this.express.use('/api/measurement', measurementRouter.router);
    }

}

export default new App().express;