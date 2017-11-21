import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutsComponent implements OnInit {

	auth: Observable<any>;
  logged: boolean = true;

  constructor(
  	private authenticationService: AuthenticationService, 
  	private cookieService: CookieService,
  	private router: Router
  	) 
  { 
    router.events.subscribe((val) => {
      if (!this.cookieService.get('Auth')) {
        this.logged = false;
      } else {
        this.logged = true;       
      }
    });
  }

  ngOnInit() {
  	this.isLogged();
  }

  isLogged() {
  	if (!this.cookieService.get('Auth')) {
      this.logged = false;
  		this.router.navigate(['/login']);
  	} else {
      this.logged = true;
    }
  }

  logout() {
    this.logged = false;
    this.authenticationService.logout();
    this.cookieService.delete('Auth');
    this.router.navigate(['/login']);
  }

}
