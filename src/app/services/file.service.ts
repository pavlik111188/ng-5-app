import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileService {

	private domain = 'https://my.binotel.ua/';

	constructor(private http: HttpClient) { }

	postToEmail(recipientEmail: string, generalCallID: string): Observable<any> {
		let res;
		let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json, text/javascript, */*; q=0.01' });
		const url = `${this.domain}?module=ajax&action=sendCallRecordToEmail&recipientEmail=${recipientEmail}&generalCallID=${generalCallID}`;
		const params = '';/*{
			"data" : {
		    "recipientEmail": "ps@binotel.ua",
		    "action": "sendCallRecordToEmail",
		    "generalCallID": "433701359"
		}
		};*/
		// const params = '';
	    return new Observable(observer => {
	    	this.http.post<any>(url, params, { headers: headers, observe: 'response', responseType: 'text' as 'json', withCredentials: true }).subscribe(
			(res) => {
				observer.next(res);
			},
			(err: HttpErrorResponse) => {
				console.log(err.error);
				console.log(err.name);
				console.log(err.message);
				console.log(err.status);
				observer.next(err.message);
			});
	    });
	}

}
