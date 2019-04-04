import { RepositoryBase } from '../repository/base.repository';

import { IUser } from './user.interface';
import { user } from './user.model';
import * as bcrypt from 'bcrypt';

export class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        super(user);
    }

    comparePassword (candidatePassword: string, hash: string, cb: (err: any, isMatch: any) => {}) {
        bcrypt.compare(candidatePassword, hash, cb);
    }
}

export let userRepo: UserRepository = new UserRepository();