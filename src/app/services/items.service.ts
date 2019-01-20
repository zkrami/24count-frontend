import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiHttpClient} from 'services/api-http-client.service';
import {Item} from 'models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: ApiHttpClient) {
  }


  get(): Observable<Item[]> {
    return this.http.get('/items').pipe(
      map(
        response => {
          return  response.data;
        }
      ));
  }
}
