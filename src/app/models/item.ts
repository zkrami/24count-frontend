export class Item{

  public name : string  ;
  public name_en  : string ;
  public code : string ;
  public shape : string ;
  public identifier : string ;
  public size : string ;
  public factory : string ;
  public id : number ;


  static init (){
    let item = new Item();
    item.name = '';
    item.name_en = '';
    item.code = '';
    item.shape = '';
    item.identifier = '';
    item.size = '';
    item.factory = '';
    item.id = 0 ;
    return item ;
  }
}
