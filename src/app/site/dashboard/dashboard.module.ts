import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from './layout/layout.module';
import {RepositoryModule} from './repository/repository.module';
import {ItemsComponent as RepositoryItemsComponent} from './repository/items/items.component';
import {AuthGuard} from 'auth.guard';
import {SharedModule} from 'core-modules/shared/shared.module';

import {OrderModule} from 'site/dashboard/order/order.module';
import {CreateComponent as OrderCreateComponent} from 'site/dashboard/order/create/create.component';
import {ListComponent as OrdersListComponent} from 'site/dashboard/order/list/list.component';
import {EditComponent as OrderEditComponent} from 'site/dashboard/order/edit/edit.component';


let routes : Routes = [
  { path : 'dashboard' , component:DashboardComponent , canActivate : [AuthGuard],
    children :[
      {path : 'repository/items' , component : RepositoryItemsComponent} ,
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
    RepositoryModule,
    SharedModule,
    OrderModule ,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
