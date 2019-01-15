import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {AppConfigService} from './app-config.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiHttpClient} from './api-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: ApiHttpClient, private appConfig: AppConfigService) {
  }


  public login(email: string, password: string) {


  }

  public getAuthToken(): string {
    return '';
  }
  public refreshToken() : Observable <string> {
    let tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('initial');
    tokenSubject.next('test1');
    tokenSubject.next('test2');
    return tokenSubject;
  }
}
