import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import { RepositoryFilterComponent } from './repository-filter/repository-filter.component';

@NgModule({
  declarations: [CreateComponent, ListComponent, DetailsComponent, EditComponent, RepositoryFilterComponent],
  imports: [
    CommonModule ,
    SharedModule
  ]
})
export class OrderModule { }
