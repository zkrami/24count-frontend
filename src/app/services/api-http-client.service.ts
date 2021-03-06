import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AppConfigService} from './app-config.service';
import {Observable, throwError} from 'rxjs';
import {ApiResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpClient {

  apiEndPoint = environment.apiEndPoint;

  constructor(public http: HttpClient, private appConfig: AppConfigService) {
    
  }


  public post(url: string, body: any | null) : Observable<ApiResponse> {
    return this.http.post(this.apiEndPoint +  url, body  , {observe : 'response'}).pipe(
      map (response => {
        let apiResponse = new ApiResponse();
        apiResponse.status = response.status;
        apiResponse.data = response.body ;
        return apiResponse;
      }),
      catchError( err => {
        this.appConfig.httpError(url , err);
        return throwError(err);
      }));

  }
  public put(url: string, body: any | null = {} ) : Observable<ApiResponse> {

    return this.http.put(this.apiEndPoint +  url, body  , {observe : 'response'}).pipe(
      map (response => {
        let apiResponse = new ApiResponse();
        apiResponse.status = response.status;
        apiResponse.data = response.body ;
        return apiResponse;
      }),
      catchError( err => {
        this.appConfig.httpError(url , err);
        return throwError(err);
      }));

  }


  public delete(url: string) : Observable<ApiResponse> {
    return this.http.delete(this.apiEndPoint +  url, {observe : 'response'}).pipe(
      map (response => {
        let apiResponse = new ApiResponse();
        apiResponse.status = response.status;
        apiResponse.data = response.body ;

        return apiResponse;
      }),
      catchError( err => {
        this.appConfig.httpError(url , err);
        return throwError(err);
      }));

  }


  public get(url: string) : Observable<ApiResponse> {
    return this.http.get(this.apiEndPoint +  url, {observe : 'response'}).pipe(
      map (response => {
        let apiResponse = new ApiResponse();
        apiResponse.status = response.status;
        apiResponse.data = response.body ;
        
        return apiResponse;
      }),
      catchError( err => {
        this.appConfig.httpError(url , err);
        return throwError(err);
      }));

  }


  public file(url : string , body : any = {} ){

    return this.http.post(this.apiEndPoint +  url, body,  {responseType: 'arraybuffer'}).pipe(
      catchError( err => {
        this.appConfig.httpError(url , err);
        return throwError(err);
      }));
  }

}
