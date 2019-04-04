import { Schema, Model, model } from 'mongoose';
import { IMeasurement } from './measurement.interface';

export let measurementTopic = 'measurement';
export let measurementSchema = new Schema({
    objectId: Schema.Types.ObjectId,
    sensorId: {
        type: String,
        required: true
    },
    versionNr: Number,
    timestamp: {
        type: Date,
        required: true
    },
    equipmentId: {
        type: String
    },
    electricityTo1: {
        type: Number
    },
    electricityTo2: {
        type: Number
    },
    electricityBy1: Number,
    electricityBy2: Number,
    tariffId: {
        type: String
    },
    electricityPowerDelivered: {
        type: Number
    },
    electricityPowerReceived: Number,
    nrOfPowerFailures: Number,
    powerFailures: Number,
    nrOfVoltageSags: Number,
    nrOfVoltageSwells: Number,
    textMessage1: String,
    textMessage2: String,
    current: Number,
    activePowerPlus: Number,
    activePowerMin: Number,
    deviceType: String,
    equipmentId2: {
        type: String
    },
    gasTime: Date,
    gas: Number,
    createdAt: Date,
    modifiedAt: Date
}).pre('save', function(next) {
    if (this._doc) {
        const doc = <IMeasurement>this._doc;
        const now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export let measurement: Model<IMeasurement> = model<IMeasurement>('Measurement', measurementSchema);
