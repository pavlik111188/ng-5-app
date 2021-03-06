import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('processing request', request);

    const customReq = request.clone({
    	responseType: 'text' as 'json',
    	withCredentials: true,
     	headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
    });

    return next
      .handle(customReq)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          // console.log('processing response', ev);
          //console.log('customReq ', customReq);
        }
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          // console.log('Processing http error', response);
        }

        return Observable.throw(response);
      });
  }
}
