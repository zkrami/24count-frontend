import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [
    CommonModule ,
    SharedModule
  ]
})
export class RepositoryModule { }
