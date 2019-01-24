export class Notification{


  data : any ;
  read_at : null ;
  created_at : Date ;
  isRead() : boolean{
    return this.read_at != null;
  }
}
