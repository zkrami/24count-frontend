import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import {UIModule} from 'site/dashboard/ui/ui.module';
import { RepositoryItemsComponent } from './repository-items/repository-items.component';

@NgModule({
  declarations: [CreateComponent, ListComponent, DetailsComponent, EditComponent, RepositoryItemsComponent],
  imports: [
    CommonModule ,
    SharedModule ,
    UIModule
  ]
})
export class PharmacyOrdersModule { }
