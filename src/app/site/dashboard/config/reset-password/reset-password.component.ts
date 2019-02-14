import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ConfigService} from 'services/config.service';
import {ErrorStateMatcher} from '@angular/material';


export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.dirty);
    return invalidParent;
  }

}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


  matcher  = new MyErrorStateMatcher();

  passwordFormControl = new FormControl('', [
    Validators.required, Validators.minLength(8), Validators.maxLength(32)
  ]);


  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);

  resetForm = new FormGroup(
    {
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl
    },
    {
      validators: [this.checkPasswords]
    }
  );
  disabled: boolean = false;

  constructor(private configService: ConfigService, private toastr: ToastrService) {

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group


    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  ngOnInit() {

  }

  disable() {

    this.disabled = true;
    this.passwordFormControl.disable();
    this.confirmPasswordFormControl.disable();
  }

  enable() {
    this.disabled = false;
    this.passwordFormControl.enable();
    this.confirmPasswordFormControl.enable();
  }


  async submit(e: Event) {

    if (this.disabled) {
      return;
    }
    this.disable();

    try {
      let response = await this.configService.resetPassword(this.passwordFormControl.value).toPromise();
      this.toastr.success('تم تعديل كلمة المرور بنجاح');


    } catch (e) {

      this.toastr.error('لقد حدث خطأ ما');
    } finally {
      this.enable();
    }
  }

  test() {

    console.log(this.resetForm);
  }

}
