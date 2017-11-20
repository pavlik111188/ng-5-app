import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CallsService } from './services/calls.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './services/authentication.service';

import { AppComponent } from './app.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ReactiveFormsModule
  ],
  providers: [CallsService, CookieService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
