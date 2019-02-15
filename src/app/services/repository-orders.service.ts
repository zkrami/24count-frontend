import {Injectable} from '@angular/core';
import {ApiHttpClient} from 'services/api-http-client.service';
import {Order} from 'models/order';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {OrderItem} from 'models/order-item';
import { saveAs } from 'file-saver';


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
        return Object.assign(new Order(), response.data, {items: response.data.items.map(it => new OrderItem(it))});
      }
    ));
  }


  /**
   * update items response_count
   * @param order
   */
  update(order: Order): Observable<Boolean> {
    return this.http.put(`/repository/orders/${order.id}`, order.toRequest()).pipe(map(
      response => {
        return response.status == 200;
      }
    ));
  }

  /**
   * reject order
   * @param order
   */
  reject(order: Order): Observable<Boolean> {
    return this.http.put(`/repository/orders/${order.id}/reject`, {}).pipe(map(
      response => {
        return response.status == 200;
      }
    ));
  }


  /**
   * accept order
   * @param order
   */
  accept(order: Order): Observable<Boolean> {
    return this.http.put(`/repository/orders/${order.id}/accept`, {}).pipe(map(
      response => {
        return response.status == 200;
      }
    ));
  }

  export(order: Order ): Observable<any> {

    return this.http.file(`/repository/orders/${order.id}/export` ).pipe(switchMap( (data) => {

      let blob = new Blob([data]);
      let url = window.URL.createObjectURL(blob);

      saveAs(blob,"24count.xls");
      return of(url);
    }));
  }



}
