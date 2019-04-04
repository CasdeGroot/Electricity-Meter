import { RepositoryBase } from '../repository/base.repository';
import { measurement } from './measurement.model';
import { IMeasurement } from './measurement.interface';

export class MeasurementRepository extends RepositoryBase<IMeasurement> {
    constructor() {
        super(measurement);
    }
}

export let measurementRepo: MeasurementRepository = new MeasurementRepository();