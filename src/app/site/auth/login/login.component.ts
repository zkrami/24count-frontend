import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {of, throwError as observableThrowError, throwError} from 'rxjs';
import {catchError, finalize, map, switchMap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Form, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email;
  public password;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private authService: AuthService , private toastr : ToastrService) {

  }

  ngOnInit() {

  }

  async submit(e : Event  , form ) {


    alert('test');

    console.log(form.valid);
    return false;
    try {



      let response = await this.authService.login(this.email, this.password).toPromise();

    } catch (e) {
      console.log(e);
      this.toastr.error("test");
    }
  }
}
