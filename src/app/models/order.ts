import {OrderItem} from 'models/order-item';
import {IToRequest} from 'models/to-request';

enum OrderState  {

  Waiting = 'waiting',
  Draft = 'draft',
  Canceled = 'canceled',
  Complete = 'complete',
  Rejected = 'rejected'
}

export class Order implements IToRequest{


  State = OrderState;
  id: number;
  repository_id: number;
  pharmacy_id: number;
  send_at: Date;
  state: OrderState;


  items: OrderItem[] = [];


  toRequest() {

    return { id : this.id , repository_id : this.repository_id , pharmacy_id : this.pharmacy_id ,
    items : this.items.map(it => it.toRequest())} ;
  }


}
