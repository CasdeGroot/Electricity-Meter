import * as mongoose from 'mongoose';

export class DatabaseConnector {

    public static connect(dbUrl: string) {
        mongoose.connect(dbUrl).then(() => {
            console.log('Connected to ' + dbUrl);
        }, (err) => {
            console.warn(err.toString());
        }).catch((err) => {
            console.warn('Warning', err.toString());
            throw new Error();
        });
    }
}
