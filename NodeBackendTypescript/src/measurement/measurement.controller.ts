import { IMeasurement } from './measurement.interface';
import { measurementRepo, MeasurementRepository } from './measurement.repository';
import { NextFunction, Request, Response } from 'express';
import {measurement, measurementSchema} from './measurement.model';
import moment = require('moment');
import { filter } from 'gulp-typescript';

export class MeasurementController {

    public handleMeasurement(measurement) {
        measurementRepo.create(measurement, (err, measurement: IMeasurement) => {
            if (err) {
                console.warn(err.toString());
            }
        });
    }

    public getBySensorId(req: Request, res: Response, next: NextFunction) {
        req.query.sensorId = req.params.id;

        measurement.find(req.query, (err, measurements: IMeasurement) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurements) return res.status(404).send('measurements not found');

            return res.status(200).json(measurements);
        });
    }

    public get(req: Request, res: Response, next: NextFunction) {
        new MeasurementRepository().findById(req.params.id, (err, measurement: IMeasurement) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurement) return res.status(404).send('measurement not found');

            return res.status(200).json(measurement);
        });
    }

    public getLast(req: Request, res: Response, next: NextFunction) {
        measurement.findOne({}, [], { $orderby : { createdAt : -1 } }, (err, measurement) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurement) return res.status(404).send('measurement not found');

            return res.status(200).json(measurement);
        });
    }

    public filter(req: Request, res: Response, next: NextFunction) {
        measurementRepo.find(req.query, (err, measurements: IMeasurement[]) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurements) return res.status(404).send('measurements not found');

            return res.status(200).json(measurements);
        });
    }

    public getAll(req: Request, res: Response, next: NextFunction) {

        let filter = {};
        if (req.query.filter != null) filter = JSON.parse(req.query.filter);
        (!req.query.beginDate) ? req.query.beginDate = moment('01-01-1970', 'DD-MM-YYYY') :  req.query.beginDate = moment(req.query.beginDate, 'DD-MM-YYYY');
        (!req.query.endDate) ? req.query.endDate = moment().add(100, 'years') : req.query.endDate = moment(req.query.endDate, 'DD-MM-YYYY');

        measurementRepo.find(filter)
            .where('timestamp').gte(req.query.beginDate.toDate().getTime()).lt(req.query.endDate.toDate().getTime())
            .select(req.query.select)
            .exec((err, measurements: IMeasurement[]) => {
                if (err) return res.status(500).send('internal server error');

                if (!measurements) return res.status(404).send('measurements not found');

                return res.status(200).json(measurements);
            });
    }
}

export let measurementController: MeasurementController = new MeasurementController();