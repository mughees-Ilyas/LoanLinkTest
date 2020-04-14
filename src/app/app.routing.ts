import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login';

const routes: Routes = [
  //login route for the root
    { path: 'login', component: LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'thermostats' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
