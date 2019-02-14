import {Component, OnInit} from '@angular/core';
import {AuthService} from 'services/auth.service';
import {User} from 'models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.user = this.authService.user;
  }

}
