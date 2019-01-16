
import {throwError as observableThrowError, Observable, BehaviorSubject, throwError, of} from 'rxjs';

import {take, filter, catchError, switchMap, finalize} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler , HttpErrorResponse} from '@angular/common/http';

import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private injector: Injector , private authService : AuthService , private router: Router) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return next.handle(this.addToken(req, this.authService.getAuthToken())).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 401:
              return this.handle401Error(req, next);
            default:
              return observableThrowError(error);
          }
        } else {
          return observableThrowError(error);
        }
      }));
  }


  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);


      return this.authService.refreshToken().pipe(

        switchMap((newToken: string) => {

          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken((req), newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
            this.logoutUser();

        }),

        catchError( (error) => {
            this.logoutUser();
            return observableThrowError(error);
        })
        ,
        finalize (()=> {
          this.isRefreshingToken  = false;
        })
        );

    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken((req), token));
}), );
    }
  }

  logoutUser() {
    // Route to the login page (implementation up to you)
     this.authService.localLogout();
     this.router.navigate(['/login']);
  }
}
