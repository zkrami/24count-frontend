import {Item} from 'models/item';
import {IToRequest} from 'models/to-request';

export class OrderItem implements IToRequest{

  id: number;
  item_id: number;
  order_id: number;
  count: number;
  response_count : number ;
  expiration : string ;

  bonus : number ;
  bonus_each : number ;
  item: Item;
  toRequest(){
    return {id: this.id , item_id : this.item_id , order_id : this.order_id  , count : this.count , response_count : this.response_count}
  }

  constructor(params: Partial<OrderItem> = {}) {

    let {
      id = null,
      item_id = null,
      order_id = null,
      count = null,
      item = null ,
      response_count = null,
      expiration = null , bonus =null , bonus_each = null
    } = params;

    this.id = id;
    this.item_id = item_id;
    this.order_id = order_id;
    this.count = count;
    this.item = item;
    this.response_count = response_count;
    this.expiration = expiration;
    this.bonus = bonus ;
    this.bonus_each = bonus_each;
  }
}


