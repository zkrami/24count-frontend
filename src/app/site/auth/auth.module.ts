import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SharedModule} from '../../core-modules/shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule ,
    SharedModule ,
    NgbModule
  ] ,
  exports : [LoginComponent]
})
export class AuthModule { }
