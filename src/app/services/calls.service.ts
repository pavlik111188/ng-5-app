import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Call } from '../interfaces/call';

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


  constructor(private http: HttpClient) { }

  getIncomingCallsForPeriod(start: Number, stop: Number) {
    const params = '{"timestamp":1390528862,"signature":"b09e13305e5100f334abcd08e040d2fe","key":"afd8ad-90d630b"}';
    const url = `${this.domain}${this.allIncomingCallsSinceUrl}`;
    /*this.http.post(url, params).subscribe(data => {
      console.log('res: ', data);
      this.results = data['results'];
    });*/
    this.http.get('./assets/json/incoming-calls-for-period.json').subscribe(data => {
      this.results = data['callDetails'];
      return this.results;
    });

  }

  getAllCalls(): Observable<any> {
    let res;
    res = this.http.get<any>('./assets/json/incoming-calls-for-period.json');
    return res;
  }

  getAllEmployes(): Observable<any> {
    let res;
    res = this.http.get<any>('./assets/json/list-of-employees.json');
    return res;
  }

}
