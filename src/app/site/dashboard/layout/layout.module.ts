import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import {RouterModule} from '@angular/router';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [HeaderComponent, MenuComponent, FooterComponent, NotificationComponent],
  imports: [
    CommonModule , SharedModule , RouterModule
  ] ,
  exports :  [ HeaderComponent, MenuComponent, FooterComponent],
})
export class LayoutModule { }
