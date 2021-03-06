import {Injectable} from '@angular/core';
import {finalize, map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiHttpClient} from './api-http-client.service';
import {User} from '../models/user';
import {ApiResponse} from 'models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: ApiHttpClient) {
  }

  private _user: User = null;

  get user(): User {
    if (this._user) {
      return this._user;
    }
    if (sessionStorage.getItem('user')) {
      return this._user = Object.assign( new User() ,  JSON.parse(sessionStorage.getItem('user')));
    }
    if (localStorage.getItem('user')) {
      return this._user = Object.assign( new User() ,  JSON.parse(localStorage.getItem('user')));
    }

    return null;
  }


  get loggedIn () : boolean{
    return this.user !== null;
  }

  public localLogout(){

    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    this._user = null;

  }
  public logout() {


    return this.http.get('/logout').pipe(finalize(
      () => {
        this.localLogout();
      }
    ));
  }

  public login(username: string, password: string, remember: boolean = true) : Observable<ApiResponse> {

    return this.http.post('/login', {username , password}).pipe(
      tap(apiResponse => {
        this.storeUser(apiResponse.data, remember);
      })
    );
  }

  public getAuthToken(): string {
    if (!this.user)
      return '';

    return this.user.access_token;
  }

  public refreshToken(): Observable<string> {
   return this.http.post('/login/refresh' , []).pipe(
     tap (apiResponse => {
        this.updateToken(apiResponse.data , this._user.remember);
     }),
     map(
        apiResponse => {
          return apiResponse.data.access_token ;
        }
      )

    );
  }


  private updateToken(data, remember: boolean) {

    // update user
    this._user = Object.assign( this._user ,  data) ;
    this._user.remember = remember ;

    if (remember)
      localStorage.setItem('user', JSON.stringify(this.user) );

    sessionStorage.setItem('user', JSON.stringify(this.user) );

  }
  private storeUser(data, remember: boolean) {

    // update user
    this._user = Object.assign(new User() ,  data) ;
    this._user.remember = remember ;

    if (remember)
      localStorage.setItem('user', JSON.stringify(this.user) );

    sessionStorage.setItem('user', JSON.stringify(this.user) );

  }
}
