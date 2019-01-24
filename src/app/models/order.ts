import {OrderItem} from 'models/order-item';
import {IToRequest} from 'models/to-request';
import {RowState} from 'models/row-state';
import {Pharmacy} from 'models/pharmacy';

enum OrderState  {

  Waiting = 'waiting',
  Draft = 'draft',
  Canceled = 'canceled',
  Rejected = 'rejected' ,
  Accepted = 'accepted'
}

export class Order implements IToRequest{

  rowState : RowState = new RowState();

  static State = OrderState;
  id: number;
  repository_id: number;
  pharmacy_id: number;
  pharmacy:Pharmacy ;
  send_at: Date;
  state: OrderState = OrderState.Draft;
  created_at : Date;

  items: OrderItem[] = [];

  toRequest() {

    return { id : this.id , repository_id : this.repository_id , pharmacy_id : this.pharmacy_id ,
    items : this.items.map(it => it.toRequest())} ;
  }


}
