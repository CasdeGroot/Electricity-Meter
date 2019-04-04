import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    password: string;
    admin: boolean;
    sensorId: string;
    createdAt: Date;
    modifiedAt: Date;
}