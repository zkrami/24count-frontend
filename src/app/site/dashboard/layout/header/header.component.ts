import { Component, OnInit } from '@angular/core';
import {LayoutService} from 'services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private layoutService : LayoutService) { }

  menuOpen : boolean = true ;
  ngOnInit() {

    this.layoutService.menuTriggered.subscribe( menuOpen => {
        this.menuOpen = menuOpen;
    });
  }
  menuClick(){
    this.layoutService.triggerMenu();
  }

}
