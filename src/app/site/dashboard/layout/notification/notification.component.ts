import {Component, Input, OnInit} from '@angular/core';
import {Notification} from 'models/notification';
import {Order} from 'models/order';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input('notification') notification: Notification;

  constructor() {
  }

  ngOnInit() {
  }

  getIcon() {
    let notification = this.notification;
    if (notification.data.state == Order.State.Waiting) {
      return 'info';
    }

    if (notification.data.state == Order.State.Canceled) {
      return 'cancel';
    }

    if (notification.data.state == Order.State.Rejected) {
      return 'cancel';
    }

    if (notification.data.state == Order.State.Accepted) {
      return 'check_circle_outline';
    }


  }

  getMessage() {
    let notification = this.notification;
    if (notification.data.pharmacy) {

      if (notification.data.state == Order.State.Waiting) {
        return `تم طلب فاتورة جديدة من قبل ${notification.data.pharmacy}`;
      }

      if (notification.data.state == Order.State.Canceled) {
        return `تم الغاء طلبية من قبل ${notification.data.pharmacy}`;
      }

    }
    if (notification.data.repository) {

      if (notification.data.state == Order.State.Accepted) {
        return `تم قبول الطلبية من قبل ${notification.data.repository}`;
      }

      if (notification.data.state == Order.State.Rejected) {
        return `تم رفض الطلبية من قبل ${notification.data.repository}`;
      }
    }
  }


  getLink() {
    let notification = this.notification;

    if (notification.data.pharmacy) {
      // repository notification
      return `/dashboard/repository/orders/1/edit`;
    } else {
      // pharmacy notification
      return `/dashboard/pharmacy/orders/1/edit`;
    }
  }

  getClass() {
    let notification = this.notification;
    if (notification.data.state == Order.State.Rejected) {
      return 'danger';
    }

    if (notification.data.state == Order.State.Canceled) {
      return 'danger';
    }

    if (notification.data.state == Order.State.Accepted) {
      return 'success';
    }

    if (notification.data.state == Order.State.Waiting) {
      return 'success';
    }

  }
}
