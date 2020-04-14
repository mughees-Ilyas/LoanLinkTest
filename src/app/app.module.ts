import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './pages/login';
import {ThermostatsModule} from '@app/pages/thermostats/thermostats.module';
import {NavbarModule} from '@app/components/navbar/navbar.module';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        ThermostatsModule,
        NavbarModule,
        appRoutingModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // fake backend provider. implemented throught httpinterceptors
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
