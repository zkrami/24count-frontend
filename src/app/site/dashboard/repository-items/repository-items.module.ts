import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDetailsInputComponent } from './item-details-input/item-details-input.component';
import {UIModule} from 'site/dashboard/ui/ui.module';

@NgModule({
  declarations: [ItemsComponent, ItemDetailsComponent, ItemDetailsInputComponent],
  imports: [
    CommonModule ,
    SharedModule ,
    UIModule
  ] ,
  exports : [ItemsComponent]
})
export class RepositoryItemsModule { }
