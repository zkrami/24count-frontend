import {Item} from 'models/item';
import {RowState} from 'models/row-state';
import {IToRequest} from 'models/to-request';
import {Bonus} from 'models/bonus';
export class RepositoryItem implements IToRequest {

  public item: Item = new Item();
  public available: boolean;
  public expiration: string;
  public discount: number;
  public bonus : Bonus[] = [] ;
  public repository_id: number;
  public rowState: RowState = new RowState();
  get net(){
    return 0 ;
  }
  static init() {
    let repositoryItem = new RepositoryItem();
    repositoryItem.available = false;
    repositoryItem.discount = 0;
    repositoryItem.bonus = [];
    repositoryItem.repository_id = 0;
    repositoryItem.item = Item.init();
    return repositoryItem;
  }

  get bonusFormatted(){
    return this.bonus.map( b => b.bonus + "/" + b.bonus_each).join(" - ");
  }

  toRequest() {
    return {
      available: this.available,
      expiration: this.expiration,
      discount: this.discount,
      bonus: this.bonus.filter( b => b.bonus && b.bonus_each),
      repository_id: this.repository_id,
      item_id: this.item.id
    };
  }

}
