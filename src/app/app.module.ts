import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { CallsService } from './services/calls.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './services/authentication.service';
import { MyHttpLogInterceptor } from './interfaces/http.interceptor';

import { AppComponent } from './app.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FileComponent } from './components/file/file.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ReactiveFormsModule,
    MomentModule
  ],
  providers: [CallsService, CookieService, AuthenticationService/*, {
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpLogInterceptor,
    multi: true,
  }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
