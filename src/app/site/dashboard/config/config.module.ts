import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import {MaterialComponentsModule} from 'core-modules/material-components/material-components.module';

@NgModule({
  declarations: [ConfigComponent, ResetPasswordComponent],
  imports: [
    CommonModule , SharedModule , MaterialComponentsModule
  ]
})
export class ConfigModule { }
