import { Injectable } from '@angular/core';
import {ApiHttpClient} from './api-http-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RepositoryItem} from 'models/RepositoryItem';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: ApiHttpClient) {
  }

  items() : Observable<RepositoryItem[]> {
    return this.http.get('/repository/items').pipe( map( response  => {

      // map response to RepositoryItem
      // @todo measure time without map
      return response.data.map((e) =>{
        let item =  new RepositoryItem();
        item = Object.assign(item , e.repositories[0] ?  e.repositories[0].pivot : null );
        item.item =  e ;
        return item ;
      });

    }));
  }



  update (item : RepositoryItem) : Observable<RepositoryItem>{
    return this.http.put(`/repository/items/${item.item.id}` , item ).pipe( map( response  => {
      // map response to RepositoryItem
        let e = response.data;
        let item =  new RepositoryItem();
        item = Object.assign(item , e.repositories[0] ?  e.repositories[0].pivot : null );
        item.item =  e ;
        return item ;
    }));
  }








  }
