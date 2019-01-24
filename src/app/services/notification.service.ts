import { Injectable } from '@angular/core';
import {ApiHttpClient} from 'services/api-http-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Notification} from 'models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : ApiHttpClient) { }


  get() : Observable<Notification[]> {
    return this.http.get("/notifications").pipe( map(response => {
      return response.data.map( not => Object.assign(new Notification() , not));
    }));
  }

  markRead() : Observable<boolean>{
    return this.http.put("/notifications/read" ).pipe(map(
      response => {
        return response.status == 200 ;
      }
    ));
  }
}
