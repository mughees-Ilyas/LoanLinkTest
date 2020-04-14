import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '@app/_models';
import { Thermostats } from '@app/_models';
import { ThermostatReading } from '@app/_models';
import thermostatData from '@app/_helpers/_fakeData/thermostatData';
import userData from '@app/_helpers/_fakeData/userData';
import userReadingData from '@app/_helpers/_fakeData/thermostatReadingData';


const users: User[] = userData;
const thermostat:Thermostats[]=thermostatData;
const thermostatReading:ThermostatReading[]=userReadingData;


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
              case url.endsWith('/thermostats') && method === 'POST':
                return addThermostats();
                case url.endsWith('/thermostats') && method === 'GET':
                    return getThermostats();
                case url.endsWith('/measurements') && method === 'GET':
                    return getThermostatsReading();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

      function addThermostats() {
            console.log(body);
            body['latestReading']={};
            thermostatData.push(body);
            return ok()
      }
        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            let data;
            if (user.role==='admin'){
                data = {
                    id: user.id,
                    username: user.username,
                    token: 'fake-jwt-token-admin',
                    role:user.role,
                }
            } else {
                data ={
                    id: user.id,
                    username: user.username,
                    token: 'fake-jwt-token'+user.id,
                    role:user.role,
                    }
                }
            return ok(data);
        }

        function getThermostatsReading() {
            if (!isLoggedIn()) return unauthorized();
                let userThermostat=[];
                let authToken = headers.get('Authorization');
                for (let token in thermostatReading){
                    if(thermostatReading.hasOwnProperty(token)) {
                        let id = url.split("thermostats/")[1].split('/')[0];
                        console.log(id);
                        if (thermostatReading[token].thermostat_id === Number(id)){
                            userThermostat.push(thermostatReading[token]);
                        }
                    }
                }
                return ok(userThermostat);

        }
        function getThermostats() {
            if (!isLoggedIn()) return unauthorized();
            if(isAdmin()){
                return ok(thermostat);
            } else  {
                let userThermostat=[];
                let authToken = headers.get('Authorization');
                for (let token in thermostat){
                    if(thermostat.hasOwnProperty(token)){
                        if (thermostat[token].household_token=== authToken){
                            userThermostat.push(thermostat[token]);
                        }
                    }
                }
                return ok(userThermostat);
            }
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            let tokenArray = ['Bearer fake-jwt-token1','Bearer fake-jwt-token3', 'Bearer fake-jwt-token-admin'];
            return tokenArray.includes(headers.get('Authorization'));

        }
        function isAdmin() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token-admin';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
