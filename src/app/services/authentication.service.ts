import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationService {

	private domain = 'https://my.binotel.ua';

  constructor(private http: HttpClient, private cookieService: CookieService) { }



  auth(email: string, password: string): Observable<any> {
  	/*const params = {
      logining: {
        email: email,
        password: password
      }
    };*/
	// const params = '';
	const params = {
      logining: {
        email: 'ps@binotel.ua',
        password: 'rt3$)oJF1ydglcsIpO'
      }
    };
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' });
    const url = `${this.domain}`;
    return new Observable(observer => {
    	this.http.post<any>(url, params, { headers: headers, observe: 'response', responseType: 'text' as 'json', withCredentials: true }).subscribe(
	      (res) => {
	      	observer.next('success');
	      	/*this.http.post<any>('https://my.binotel.ua/?module=cdrs&startDay=14&startMonth=11&startYear=2017&stopDay=14&stopMonth=11&stopYear=2017&showOnlyFilters=&callType=internal', '', { headers: headers, observe: 'response', responseType: 'text' as 'json', withCredentials: true }).subscribe(
		      (res) => {
		      	console.log(res.body);
		      	if (res.body == '{"status":"failed"}') {
		      		observer.next('success');
		      	} else {
		      		observer.next('Вы ввели неверные данные');
		      	}		      	
		      },
		      (err: HttpErrorResponse) => {
		          console.log(err.error);
		          console.log(err.name);
		          console.log(err.message);
		          console.log(err.status);
		          observer.next(err.message);
		      });*/
	      },
	      (err: HttpErrorResponse) => {
	          console.log(err.error);
	          console.log(err.name);
	          console.log(err.message);
	          console.log(err.status);
	          observer.next(err.message);
	      });
	    /*let res;
	    res = this.http.post<any>(url, params, { headers: headers, observe: 'response', responseType: 'text' as 'json', withCredentials: true }).subscribe(
	      (res) => {
	      	console.log(res.headers);
	          //this.cookieService.set( 'Auth', 'success' );
	          return 'success';
	        },
	        (err: HttpErrorResponse) => {
	          console.log(err.error);
	          console.log(err.name);
	          console.log(err.message);
	          console.log(err.status);
	          return err.message;
	        });
	    return res;*/
	  });
	}

}
