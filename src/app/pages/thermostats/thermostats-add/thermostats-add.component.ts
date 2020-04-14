import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ThermostatsService, AuthenticationService } from '@app/_services';


@Component(
  {
    templateUrl: 'thermostats-add.component.html',
  }

)
export class ThermostatsAddComponent {
    loading = false;
    submitted = false;
    ThermostatAddForm: FormGroup;
    error = '';

    constructor(
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private thermostatsService: ThermostatsService,
    ) { }

    ngOnInit() {
      this.ThermostatAddForm = this.formBuilder.group({
        token:['',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z ]*$')]
        ],
        address:['',
          [
            Validators.required,
            Validators.maxLength(20)]
        ]
      });
    }

  // convenience getter for easy access to form fields
  get f() { return this.ThermostatAddForm.controls; }

/*
* submit the data for new Thermostat that has to be added in system
 */
  onSubmit() {
    // stop here if form is invalid

    this.submitted = true;
    if (this.ThermostatAddForm.invalid) {
      return;
    }

    this.loading = true;

    let data =   { id: Date.now(), household_token: this.f.token.value,  location:this.f.address.value };
      this.thermostatsService.addThermostat(data)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['thermostat']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

}
