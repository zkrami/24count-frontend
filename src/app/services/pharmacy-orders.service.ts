import {Injectable} from '@angular/core';
import {ApiHttpClient} from 'services/api-http-client.service';
import {Order} from 'models/order';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PharmacyOrdersService {

  constructor(private http: ApiHttpClient) {
  }

  update(order: Order): Observable<Order> {
    return this.http.put(`/pharmacy/orders/${order.id ? order.id : ''}`, order.toRequest()).pipe(map(
      response => {
        return Object.assign(new Order(), response.data);
      }
    ));
  }


  delete(order: Order): Observable<Boolean> {
    return this.http.delete(`/pharmacy/orders/${order.id}/` ).pipe(map(
      response => {
        return response.status == 200 ;
      }
    ));
  }

  cancel(order: Order): Observable<Boolean> {
    return this.http.put(`/pharmacy/orders/${order.id}/cancel` , {}).pipe(map(
      response => {
        return response.status == 200 ;
      }
    ));
  }

  confirm(order: Order): Observable<Boolean> {
    return this.http.put(`/pharmacy/orders/${order.id}/confirm` , {}).pipe(map(
      response => {
        return response.status == 200 ;
      }
    ));
  }

  get(): Observable<Order[]> {
    return this.http.get('/pharmacy/orders/').pipe(map(
      response => {
        return response.data.map(it => Object.assign(new Order(), it));
      }
    ));
  }

  getById(id: number): Observable<Order> {
    return this.http.get(`/pharmacy/orders/${id}`).pipe(map(
      response => {
        return Object.assign(new Order(), response.data);
      }
    ));
  }
}
