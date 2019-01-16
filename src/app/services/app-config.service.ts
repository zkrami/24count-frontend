import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() { }

  public log(message){
    console.log(message);
  }
  public httpError(url , error){
    console.log(url);
  }

}
