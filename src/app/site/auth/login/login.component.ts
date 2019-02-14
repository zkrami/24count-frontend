import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
      email: this.emailFormControl,
      password: this.passwordFormControl
    }
  );
  disabled: boolean = false;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit() {

    if (this.authService.loggedIn) {
      this.navigate();
    }
  }

  navigate() {
    this.router.navigate(['/dashboard']);

  }

  disable() {

    this.disabled = true;
    this.emailFormControl.disable();
    this.passwordFormControl.disable();
  }

  enable() {
    this.disabled = false;
    this.passwordFormControl.enable();
    this.emailFormControl.enable();
  }

  async submit(e: Event) {


    if (this.disabled) {
      return;
    }
    this.disable();
    try {
      let response = await this.authService.login(this.emailFormControl.value, this.passwordFormControl.value).toPromise();
      this.toastr.success('تم تسجيل الدخول بنجاح');
      this.navigate();

    } catch (e) {

      this.toastr.error('اسم المستخدم او كلمة المرور غير صالحة');
    } finally {
      this.enable();
    }
  }
}
