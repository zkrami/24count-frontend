import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDetailsInputComponent } from './item-details-input/item-details-input.component';

@NgModule({
  declarations: [ItemsComponent, ItemDetailsComponent, ItemDetailsInputComponent],
  imports: [
    CommonModule ,
    SharedModule
  ] ,
  exports : [ItemsComponent]
})
export class RepositoryItemsModule { }
