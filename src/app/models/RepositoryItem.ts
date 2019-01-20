import {Item} from 'models/Item';
import {RowState} from 'models/row-state';
import {IToRequest} from 'models/to-request';

export class RepositoryItem implements IToRequest {

  public item: Item = new Item();
  public count: number;
  public expiration: Date;
  public discount: number;
  public bonus: number;
  public net: number;
  public repository_id: number;
  public rowState: RowState = new RowState();

  static init() {
    let repositoryItem = new RepositoryItem();
    repositoryItem.count = 0;
    repositoryItem.discount = 0;
    repositoryItem.bonus = 0;
    repositoryItem.net = 0;
    repositoryItem.repository_id = 0;
    repositoryItem.item = Item.init();
    return repositoryItem;
  }

  toRequest() {
    return {
      count: this.count,
      expiration: this.expiration,
      discount: this.discount,
      bonus: this.bonus,
      net: this.net,
      repository_id: this.repository_id,
      item_id: this.item.id
    };
  }

}
