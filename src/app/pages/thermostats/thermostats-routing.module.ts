import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThermostatsListComponent } from './thermostats-list';
import {AuthGuard} from '@app/_helpers'
import {AdminAuthGuard} from '@app/_helpers'
import {ThermostatsDetailComponent} from '@app/pages/thermostats/thermostats-detail/thermostats-detail.component';
import {ThermostatsAddComponent} from '@app/pages/thermostats/thermostats-add';

const heroesRoutes: Routes = [
  { path: 'thermostats', component: ThermostatsListComponent, canActivate: [AuthGuard] },
  { path: 'thermostats/:id', component: ThermostatsDetailComponent,  canActivate: [AuthGuard] },
  { path: 'thermostats/thermostat/new', component: ThermostatsAddComponent,  canActivate: [AdminAuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ThermostatsRoutingModule { }
