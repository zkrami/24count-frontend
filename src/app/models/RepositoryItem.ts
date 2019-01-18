import {Item} from 'models/Item';

export class RepositoryItem {

  public item: Item = new Item();
  public count: number;
  public expiration: Date;
  public discount: number;
  public bonus: number;
  public net: number;
  public repository_id: number;
  static init(){
    let repositoryItem = new RepositoryItem();
    repositoryItem.count = 0 ;
    repositoryItem.discount = 0 ;
    repositoryItem.bonus = 0 ;
    repositoryItem.net = 0;
    repositoryItem.repository_id = 0 ;
    repositoryItem.item = Item.init();
    return repositoryItem;
  }

}
