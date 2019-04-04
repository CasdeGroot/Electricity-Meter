import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { userRepo } from '../user/user.repository';
import moment = require('moment');
import { IUser } from '../user/user.interface';
const config = require('../../config');

export class AuthController {

    public authenticate(req: Request, res: Response) {

        userRepo.findOne({
            username: req.body.username
        }, (err, user) => {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                userRepo.comparePassword(req.body.password, user.password, (err, isMatch: boolean) => {
                    if (err) { return res.json({ success: false, message: 'internal server error.' }); }
                    if (isMatch) {
                        const payload = {
                            admin: user.admin
                        };

                        const token = jwt.sign(payload, config.secret, {
                            expiresIn: '7d'
                        });

                        console.log('time for response');
                        // return the information including token as JSON
                        res.status(200).json({
                            id_token: token,
                            expires_at: moment().add(7, 'days'),
                            user: user.toJSON()
                        });
                    } else {
                        return res.json({ success: false, message: 'failed to authenticate user' });
                    }
                });
            }
        });
    }

    public verify(req: Request, res: Response, next: NextFunction) {
        let token = req.body.token || req.query.token || req.headers.authorization;


        if (token) {
            token = token.indexOf('Bearer') >= 0 ? token.substr(7, token.length) : token;

            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    /* tslint:disable:no-string-literal */
                    req['decoded'] = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }

    public linkSensor(req: Request, res: Response, next: NextFunction) {
        userRepo.findOne({
            name: req.body.name,
        }, (err, user: IUser) => {
            if (err) {
                return res.status(500).send('internal server error');
            }

            if (!user) {
                return res.status(404).send('User not found');
            }

            if (user) {
                userRepo.comparePassword(req.body.password, user.password, (err, isMatch: boolean) => {
                    if (err) return res.status(500).send('internal server error');

                    if (!isMatch) return res.status(404).send('failed to authenticate user');

                    const userDoc = user;
                    if (isMatch) {
                        user.sensorId = req.body.sensorId;
                        userRepo.update(user.id, user, (err, user: IUser) => {
                            if (err) {
                                return res.status(500).send('internal server error');
                            }

                            return res.status(200).json(userDoc);
                        });
                    }
                });
            }
        });
    }
}

export let authController: AuthController = new AuthController();