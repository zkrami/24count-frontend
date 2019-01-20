import {Item} from 'models/item';
import {RowState} from 'models/row-state';
import {IToRequest} from 'models/to-request';

export class RepositoryItem implements IToRequest {

  public item: Item = new Item();
  public available: boolean;
  public expiration: Date;
  public discount: number;
  public bonus: number;
  public repository_id: number;
  public rowState: RowState = new RowState();

  static init() {
    let repositoryItem = new RepositoryItem();
    repositoryItem.available = false;
    repositoryItem.discount = 0;
    repositoryItem.bonus = 0;
    repositoryItem.repository_id = 0;
    repositoryItem.item = Item.init();
    return repositoryItem;
  }

  toRequest() {
    return {
      available: this.available,
      expiration: this.expiration,
      discount: this.discount,
      bonus: this.bonus,
      repository_id: this.repository_id,
      item_id: this.item.id
    };
  }

}
