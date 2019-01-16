import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';

@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule
  ] ,
  exports : [ItemsComponent]
})
export class RepositoryModule { }
