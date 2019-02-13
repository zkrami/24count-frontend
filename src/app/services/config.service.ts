import { Injectable } from '@angular/core';
import {ApiHttpClient} from 'services/api-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  constructor(private http: ApiHttpClient) {
  }


  resetPassword(password){

    return this.http.put('/config/reset' , {password : password });
  }
}
