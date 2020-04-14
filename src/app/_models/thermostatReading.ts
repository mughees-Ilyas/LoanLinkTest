// model for thermostat Readings.
export interface ThermostatReading {
    id: number;
    household_token:string;
    location:string;
    thermostat_id:number;
    temperature:number;
    humidity:number;
    battery_charge:number;
}
