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
    return new Observable(observer => {
      this.http.get<any>('./assets/json/list-of-lost-calls-today.json').subscribe(
        (res) => {
          observer.next(res);    
        },
        (error) => {
          observer.next(error);
        }
      )
    });
  }

}
