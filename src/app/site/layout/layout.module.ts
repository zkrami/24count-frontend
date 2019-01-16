import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SkeletonComponent, HeaderComponent, MenuComponent, FooterComponent],
  imports: [
    CommonModule
    ,RouterModule
  ] ,
  exports :  [SkeletonComponent, HeaderComponent, MenuComponent, FooterComponent],
})
export class LayoutModule { }
