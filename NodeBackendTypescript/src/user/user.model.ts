import { Schema, Model, model } from 'mongoose';
import { IUser } from './user.interface';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'validator';

export let userSchema: Schema = new Schema({
    objectId: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean,
    sensorId: String,
    cellPhone: {
        type: String,
        required: false,
        // validate: (phone) => {
        //     const phoneNumber = /^(((0)[1-9]{2}[0-9][-]?[1-9][0-9]{5})|((\\+31|0|0031)[1-9][0-9][-]?[1-9][0-9]{6}))$/;
        //     const mobileNumber = /^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/i;
        //     return (phoneNumber.test(phone) || mobileNumber.test(phone));
        // }
    },
    homePhone: String,
    address: {
        type: String,
        required: true
    },
    areaCode: {
        type: String,
        required: true,
        // validate: (zipcode) => {
        //     const regex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;
        //     return regex.test(zipcode);
        // }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        validate: [ isEmail, 'invalid email' ]
    },
    createdAt: Date,
    modifiedAt: Date
}).pre('save', function(next) {
    if (this._doc) {
        const doc = <IUser>this._doc;
        const now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;

        if (!doc.sensorId) {
            doc.sensorId = '';
        }

        if (!this.isModified('password')) { return next(); }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(doc.password, salt, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next();
                return this;
            });
        });
    }

});

export let user: Model<IUser> = model<IUser>('User',  userSchema);

