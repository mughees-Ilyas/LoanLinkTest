import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Thermostats } from '@app/_models';
import { ThermostatReading } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ThermostatsService {
    constructor(private http: HttpClient) { }
    /*
    * fucntion to get all the Thermostats from backend
     */
    getAll() {
        return this.http.get<Thermostats[]>(`${environment.apiUrl}/thermostats`);
    }
    /*
     * function to get all readings from specific Thermostat to system.
     * id: thermostat id
     */
    getReadings(id) {
        return this.http.get<ThermostatReading[]>(`${environment.apiUrl}/thermostats/${id}/measurements`);
    }
    /*
    * function to add Thermostat
    * data: thermostat data
    */
    addThermostat(data) {
        return this.http.post(`${environment.apiUrl}/thermostats`, data);
    }
}
