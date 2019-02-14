import {Injectable} from '@angular/core';
import {ApiHttpClient} from './api-http-client.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {RepositoryItem} from 'models/repository-item';
import {Repository} from 'models/repository';
import {Item} from 'models/item';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: ApiHttpClient ) {
  }

  get(): Observable<Repository[]> {
    return this.http.get('/repositories').pipe(
      map(
        response => {
          return response.data;
        }
      ));
  }

  getById(id): Observable<Repository> {

    return this.http.get(`/repositories/${id}`).pipe(map(
      response => {

        let repository = Object.assign(new Repository(), response.data);
        repository.items = response.data.items.map(e => {
          let item = new RepositoryItem();
          item = Object.assign(item, e);
          item.item = Object.assign(new Item(), e.item);
          return item;
        });
        return repository;
      }
    ));
  }

  // get items for the current repository
  items(): Observable<RepositoryItem[]> {
    return this.http.get('/repository/items').pipe(map(response => {

      // map response to RepositoryItem
      return response.data.map((e) => {
        let item = new RepositoryItem();
        item = Object.assign(item, e);
        item.item = Object.assign(new Item(), e.item);
        return item;
      });

    }));
  }


  update(item: RepositoryItem): Observable<RepositoryItem> {
    return this.http.put(`/repository/items/${item.item.id}`, item.toRequest()).pipe(map(response => {
      // map response to RepositoryItem
      let e = response.data;
      let item = new RepositoryItem();
      item = Object.assign(item, e.pivot);
      item.item = Object.assign(new Item(), e);
      return item;
    }));
  }


  import(file : File , type:string)  :  Observable<RepositoryItem[]>{


    const formData = new FormData();
    formData.append('data', JSON.stringify({
      type:type
    }));
    formData.append('file', file);

    return this.http.post("/repository/items" , formData).pipe(map( (response) => {
      return response.data.map((e) => {
        let item = new RepositoryItem();
        item = Object.assign(item, e.pivot);
        //console.log(item.expiration);
        item.item = Object.assign(new Item(), e);
        return item;
      });
    }));

  }
}
