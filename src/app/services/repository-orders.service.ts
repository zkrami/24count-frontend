import { Injectable } from '@angular/core';
import {ApiHttpClient} from 'services/api-http-client.service';
import {Order} from 'models/order';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoryOrdersService {

  constructor(private http: ApiHttpClient) {
  }

  get(): Observable<Order[]> {
    return this.http.get('/repository/orders/').pipe(map(
      response => {
        return response.data.map(it => Object.assign(new Order(), it));
      }
    ));
  }

  getById(id: number): Observable<Order> {
    return this.http.get(`/repository/orders/${id}`).pipe(map(
      response => {
        return Object.assign(new Order(), response.data);
      }
    ));
  }
}
