import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from './layout/layout.module';
import {RepositoryItemsModule} from './repository-items/repository-items.module';
import {ItemsComponent as RepositoryItemsComponent} from './repository-items/items/items.component';
import {AuthGuard} from 'auth.guard';
import {SharedModule} from 'core-modules/shared/shared.module';

import {PharmacyOrdersModule} from 'site/dashboard/pharmacy-orders/pharmacy-orders.module';
import {CreateComponent as OrderCreateComponent} from 'site/dashboard/pharmacy-orders/create/create.component';
import {ListComponent as OrdersListComponent} from 'site/dashboard/pharmacy-orders/list/list.component';
import {EditComponent as OrderEditComponent} from 'site/dashboard/pharmacy-orders/edit/edit.component';


let routes : Routes = [
  { path : 'dashboard' , component:DashboardComponent , canActivate : [AuthGuard],
    children :[
      {path : 'repository-items/items' , component : RepositoryItemsComponent} ,
      {path : 'orders/create' , component : OrderCreateComponent },
      {path : 'orders/:id/edit' , component : OrderEditComponent},
      {path : 'orders/' , component : OrdersListComponent},
    ]}
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    LayoutModule,
    RepositoryItemsModule,
    SharedModule,
    PharmacyOrdersModule ,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
