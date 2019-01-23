import {EventEmitter, Injectable, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() {
  }

  private menuOpen = true;
  menuTriggered  = new BehaviorSubject<boolean>(true);

  triggerMenu(){
    this.menuOpen = !this.menuOpen;
    this.menuTriggered.next(this.menuOpen);
  }
}
