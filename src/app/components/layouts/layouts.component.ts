import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutsComponent implements OnInit {

	auth: Observable<any>;

  constructor(
  	private authenticationService: AuthenticationService, 
  	private cookieService: CookieService,
  	private router: Router
  	) { }

  ngOnInit() {
  	this.isLogged();
  }

  isLogged() {
  	if (!this.cookieService.get('Auth')) {
  		this.router.navigate(['/login']);
  	}
  }

  logout() {
    this.authenticationService.logout();
    this.cookieService.delete('Auth');
    this.router.navigate(['/login']);
  }

}
