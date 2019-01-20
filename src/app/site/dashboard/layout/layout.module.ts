import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, MenuComponent, FooterComponent],
  imports: [
    CommonModule , SharedModule , RouterModule
  ] ,
  exports :  [ HeaderComponent, MenuComponent, FooterComponent],
})
export class LayoutModule { }
