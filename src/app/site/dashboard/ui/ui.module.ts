import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsFilterComponent } from './items-filter/items-filter.component';
import {SharedModule} from 'core-modules/shared/shared.module';

@NgModule({
  declarations: [ItemsFilterComponent],
  imports: [
    CommonModule , SharedModule
  ] , exports : [ItemsFilterComponent]
})
export class UIModule { }
