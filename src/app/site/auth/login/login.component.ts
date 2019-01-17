import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {of, throwError as observableThrowError, throwError} from 'rxjs';
import {catchError, finalize, map, switchMap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  loginForm = new FormGroup(
    {
      email : this.emailFormControl,
      password : this.passwordFormControl
    }
  );


  constructor(private authService: AuthService , private toastr : ToastrService , private router : Router) {

  }

  ngOnInit() {

  }

  async submit(e : Event  ) {

    try {
      let response = await this.authService.login(this.emailFormControl.value, this.passwordFormControl.value).toPromise();
      this.toastr.success("تم تسجيل الدخول بنجاح");
      this.router.navigate(['/']);

    } catch (e) {

      this.toastr.error("اسم المستخدم او كلمة المرور غير صالحة");
    }
  }
}
