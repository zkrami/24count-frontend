export class User{

  name:string ;
  email:string ;
  access_token:string ;
  expires_in:number;
  permissions : string[];
  remember: boolean ;
  role:string ;

  pharmacist() : boolean{
    return this.role == 'pharmacist';
  }
  repository() : boolean{
    return this.role == 'repository';
  }

}
