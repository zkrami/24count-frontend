import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsFilterComponent } from './items-filter/items-filter.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import { MaxIntDirective } from './directives/max-int.directive';

@NgModule({
  declarations: [ItemsFilterComponent, MaxIntDirective],
  imports: [
    CommonModule , SharedModule
  ] , exports : [ItemsFilterComponent , MaxIntDirective]
})
export class UIModule { }
