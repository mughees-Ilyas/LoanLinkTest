import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Thermostats } from '@app/_models';
import { Router } from '@angular/router';

import { ThermostatsService, AuthenticationService } from '@app/_services';

@Component(
  {
    templateUrl: 'thermostats-list.component.html',
    styleUrls: ['thermostats-list.component.css']
  }

)
export class ThermostatsListComponent {
    loading = false;
    thermostats: Thermostats[];
    isAdmin = false;
    intervalId;

    constructor(private authenticationService:AuthenticationService,
                private thermostatsService: ThermostatsService,
                private router: Router,
                ) { }

    ngOnInit() {
      // set loading true to set the spinner while we get the data
        this.loading = true;
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser.role==='admin') {
            this.isAdmin = true;
        }
        this.loadData();
        //load data every 1 minutes
        this.intervalId = setInterval(() => {
            this.loadData();
        }, 60000);

    }
    loadData() {
        this.thermostatsService.getAll().pipe(first()).subscribe(thermostats => {
            this.loading = false;
            this.thermostats = thermostats;
        });
    }
    /*
     * navigate to new Thermostat page to add new Thermostat
     */
  newThermostat() {
    this.router.navigate(['thermostats/thermostat/new']);
  }
    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

}
