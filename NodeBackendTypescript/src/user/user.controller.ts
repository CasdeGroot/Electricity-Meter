import { Request, Response, NextFunction } from 'express';
import { IUser } from './user.interface';
import { userRepo } from './user.repository';

export class UserController {
    public getAll (req: Request, res: Response, next: NextFunction) {
        userRepo.retrieve((error, users: IUser[]) => {
            if (error) {
                return res.status(500).send('internal server error');
            }

            return res.status(200).json(users);
        });
    }

    public get(req: Request, res: Response, next: NextFunction) {
        userRepo.findById(req.params.id,  (err, user: IUser) => {
            if (err) {
                return res.status(500).send(err.toString());
            }

            return res.status(200).json(user);
        });
    }

    public post(req: Request, res: Response,  next: NextFunction) {
        req.body.isAdmin = false;
        userRepo.create(req.body as IUser, (err, user: IUser) => {
            if (err) {
                return res.status(500).json('internal server error');
            }

            return res.status(200).json(user);
        });
    }
}

export let userController: UserController = new UserController();

