import { Injectable } from '@angular/core';
import {ApiHttpClient} from './api-http-client.service';
import {Observable} from 'rxjs';
import {Item} from '../models/Item';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoryItemsService {

  constructor(private http: ApiHttpClient) {
  }

  get() : Observable<Item[]> {
    return this.http.get('/items').pipe( map( response  => {
      
      return response.data;
    }));
  }

}
