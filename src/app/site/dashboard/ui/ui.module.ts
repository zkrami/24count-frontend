import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsFilterComponent } from './items-filter/items-filter.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import { MaxIntDirective } from './directives/max-int.directive';
import { MaxFloatDirective } from './directives/max-float.directive';

@NgModule({
  declarations: [ItemsFilterComponent, MaxIntDirective, MaxFloatDirective],
  imports: [
    CommonModule , SharedModule
  ] , exports : [ItemsFilterComponent , MaxIntDirective , MaxFloatDirective]
})
export class UIModule { }
