import * as mqtt from 'mqtt';
import { measurementController } from '../measurement/measurement.controller';
import { measurementTopic } from '../measurement/measurement.model';
const config = require('../../config');

export class  MqttConnector {
    public static mqttClient;

    public static connect() {
       this.mqttClient = mqtt.connect(config.mqttBroker, { username: config['mqtt-username'], password: config['mqtt-password'] });
        this.mqttClient.on('connect', () => {
            console.log('mqtt connected');
            this.mqttClient.subscribe('measurement');
        });

        this.mqttClient.on('message', (topic, message) => {

            try  {
                message = JSON.parse(message);
            } catch {
                console.warn('not a valid json');
            }
            // message is Buffer
            if (topic === measurementTopic) {
                measurementController.handleMeasurement(message);
            }
        });
    }
}