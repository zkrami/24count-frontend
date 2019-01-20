import { Injectable } from '@angular/core';
import {ApiHttpClient} from 'services/api-http-client.service';
import {Order} from 'models/order';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : ApiHttpClient) { }


  update(order : Order)   : Observable<Order>{

    return this.http.put(`/orders/${order.id ? order.id : '' }`  , order.toRequest()).pipe(map(
      response => {
          return  Object.assign( new Order() ,  response.data ) ;
      }
    ));
  }
}
