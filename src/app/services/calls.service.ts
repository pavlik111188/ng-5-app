import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Call } from '../interfaces/call';
import { CookieService } from 'ngx-cookie-service';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class CallsService {

  call: Call[] = [];
  private domain = 'https://api.binotel.com/api/3.0/';
  private incomingCallsForPeriodUrl = 'stats/incoming-calls-for-period.json';
  private allIncomingCallsSinceUrl = 'stats/all-incoming-calls-since.json';
  results = [];

  private handleErrorObservable (error: Response | any) {
  console.error(error.message || error);
  return Observable.throw(error.message || error);
    }


  constructor(private http: HttpClient) { }

  getIncomingCallsForPeriod(): Observable<any> {
    const params = {
      logining: {
        email: 'ps@binotel.ua',
        password: 'rt3$)oJF1ydglcsIpO'
      }
    };

    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' });

    //const params = '';
    const url = `${this.domain}${this.allIncomingCallsSinceUrl}`;
    /*return this.http.post<any>(
        'https://my.binotel.ua',
        params,
        options: { headers, withCredentials: true, responseType: 'text' }).subscribe(
        res => {
          console.log(res.headers);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);          
        }
    );*/

        let res;
    res = this.http.post<any>('https://my.binotel.ua', params, { headers: headers, observe: 'response', responseType: 'text' as 'json', withCredentials: true }).subscribe(
      (res) => {
          console.log(res.headers);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
          
        });
    return res;

  }


  getAllCalls(url: string): Observable<any> {
    let res;
    res = this.http.get<any>(url);
    return res;
  }

  getAllEmployes(): Observable<any> {
    let res;
    res = this.http.get<any>('./assets/json/list-of-employees.json');
    return res;
  }

  getLostCalls(): Observable<any> {
    let res;
    res = this.http.get<any>('./assets/json/list-of-lost-calls-today.json');
    return res;
  }

}
