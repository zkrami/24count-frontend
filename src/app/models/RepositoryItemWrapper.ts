import {RepositoryItem} from 'models/RepositoryItem';

export class RepositoryItemWrapper {


  constructor(public  wrapped : RepositoryItem){

  }
  processing:boolean = false;
  error:boolean = false;
  sucess:boolean = false ;



}
