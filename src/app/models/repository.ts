import {RepositoryItem} from 'models/repository-item';

export class Repository {

  id:number;
  name:string ;
  address:string ;
  items : RepositoryItem[] = null ;

}
