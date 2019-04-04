import * as mongoose from 'mongoose';
import moment = require("moment");
import {Moment} from "moment";

export interface IRead<T> {
    retrieve: (callback: (error: any, result: any) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;
    findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T>;
    find(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]>;
}

export interface IWrite<T> {
    create: (item: T, callback: (error: any, result: any) => void) => void;
    update: (_id: string, item: T, callback: (error: any, result: any) => void) => void;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
}

export class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    protected _model: mongoose.Model<mongoose.Document>;
    protected _schema: mongoose.Schema;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
        this._schema = schemaModel.schema;
    }

    create(item: T, callback: (error: any, result: T) => void) {
        this._model.create(item, callback);
    }

    retrieve(callback: (error: any, result: T[]) => void) {
        this._model.find({}, callback);
    }

    update(_id: string, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: this.toObjectId(_id) }, item, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, undefined));
    }

    findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(this.toObjectId(_id), callback);
    }

    findOne(cond?: Object, callback?: (err: any, res: any) => void): mongoose.Query<any> {
        return this._model.findOne(cond, callback);
    }

    find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<any[]> {
        return this._model.find(cond, callback);
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }

}