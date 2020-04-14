import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ThermostatReading } from '@app/_models';
import { ThermostatsService, AuthenticationService } from '@app/_services';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({ templateUrl: 'thermostats-detail.component.html' })
export class ThermostatsDetailComponent {
    loading = false;
    readings: ThermostatReading[];
    id:number;

    constructor(
      private thermostatsService: ThermostatsService,
      private route: ActivatedRoute,
      private router: Router,
    ) { }

    ngOnInit() {
        // set loading true to show spinner
      this.loading = true;
      this.route.paramMap.subscribe(params => {
          //get thermostat id from url route
        this.id = +params.get("id")
      });
      // load all readings for given thermostat
        this.thermostatsService.getReadings(this.id).pipe(first()).subscribe(readings => {
            this.loading = false;
          this.readings = readings;
        });
    }
/*
* get back to main page
 */
  getBack() {
    this.router.navigate(['/thermostats']);
  }
}
