import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsFilterComponent} from './items-filter/items-filter.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import {MaxIntDirective} from './directives/max-int.directive';
import {MaxFloatDirective} from './directives/max-float.directive';
import {LessThanDirective} from './directives/less-than.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DateFieldComponent } from './date-field/date-field.component';

@NgModule({
  declarations: [ItemsFilterComponent, MaxIntDirective, MaxFloatDirective, LessThanDirective, ConfirmDialogComponent, DateFieldComponent],
  imports: [
    CommonModule, SharedModule
  ], exports: [ItemsFilterComponent, MaxIntDirective, MaxFloatDirective , LessThanDirective , ConfirmDialogComponent , DateFieldComponent]
  ,entryComponents :[ConfirmDialogComponent]
})
export class UIModule {
}
