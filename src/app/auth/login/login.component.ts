import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {of, throwError as observableThrowError, throwError} from 'rxjs';
import {catchError, finalize, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email;
  public password;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

  }

 async submit() {

    try {
      let response = await this.authService.login(this.email, this.password).toPromise();

    }catch (e) {
      console.log(e);
    }
  }
}
