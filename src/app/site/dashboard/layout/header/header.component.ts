import { Component, OnInit } from '@angular/core';
import {LayoutService} from 'services/layout.service';
import {NotificationService} from 'services/notification.service';
import {Notification} from 'models/notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private layoutService : LayoutService , private notificationService : NotificationService) { }

  menuOpen : boolean = true ;
  notifications:Notification[] =[];
  unreadCount:number = 0 ;
  async ngOnInit() {

    this.layoutService.menuTriggered.subscribe(menuOpen => {
      this.menuOpen = menuOpen;
    });
    this.notifications = await this.notificationService.get().toPromise();
    this.unreadCount = this.countUnRead();
  }
  countUnRead() : number{
    return this.notifications.map( el => el.isRead()  ?  0 as number : 1 as number  ).reduce( (total , el ) =>  (total + el) );
  }
  menuClick(){
    this.layoutService.triggerMenu();
  }

  notificationOpen : boolean =  false;

  toggleNotification(){
    if(this.unreadCount){
      this.unreadCount = 0 ;
      this.notificationService.markRead().subscribe();
    }
    this.notificationOpen = !this.notificationOpen;
  }


}
