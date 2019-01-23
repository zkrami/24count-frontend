import {RepositoryItem} from 'models/repository-item';
import {Item} from 'models/item';

export class Repository {

  id:number;
  name:string ;
  address:string ;
  items : RepositoryItem[] = null ;

  repositoryItems() : Item[]{
    return this.items.map(it => it.item);
  }


}
