import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


import {ThermostatsDetailComponent} from '@app/pages/thermostats/thermostats-detail/thermostats-detail.component';
import { ThermostatsListComponent } from './thermostats-list';
import { ThermostatsRoutingModule } from './thermostats-routing.module';
import {ThermostatsAddComponent} from '@app/pages/thermostats/thermostats-add';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThermostatsRoutingModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  declarations: [
    ThermostatsDetailComponent,
    ThermostatsListComponent,
    ThermostatsAddComponent
  ]
})
export class ThermostatsModule {}
