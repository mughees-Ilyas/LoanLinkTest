// model for thermostat.
import { ThermostatReading } from '@app/_models';
export interface Thermostats {
    id: number;
    household_token:string;
    location:string;
    latestReading: ThermostatReading;
}
