import {Injectable} from '@angular/core';
import {ApiHttpClient} from './api-http-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RepositoryItem} from 'models/repository-item';
import {Repository} from 'models/repository';
import {Item} from 'models/item';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: ApiHttpClient) {
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
        repository.items = response.data.items.map(it => {
          let item = new RepositoryItem();
          item = Object.assign(item, it.pivot);
          item.item = Object.assign(new Item(), it);
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
      // @todo measure time without map
      return response.data.map((e) => {
        let item = new RepositoryItem();
        item = Object.assign(item, e.pivot);
        item.item = Object.assign(new Item(), e);
        return item;
      });

    }));
  }

/*
  repositoryItems(repository_id): Observable<Item[]> {
    return this.getById(repository_id).pipe(map(
      repository => {
        return repository.items.map(it => it.item);
      }
    ));
  }*/

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


}
