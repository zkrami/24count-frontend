import { Component, OnInit } from '@angular/core';
import {LayoutService} from 'services/layout.service';
import {AuthService} from 'services/auth.service';
import {User} from 'models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private layoutService : LayoutService , public auth : AuthService) { }

  menuOpen : boolean = true ;
  ngOnInit() {

    this.layoutService.menuTriggered.subscribe( menuOpen => {
      this.menuOpen = menuOpen;
    });
  }
}
