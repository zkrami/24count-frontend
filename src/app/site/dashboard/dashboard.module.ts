import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from './layout/layout.module';
import {RepositoryModule} from './repository/repository.module';
import {ItemsComponent as RepositoryItemsComponent} from './repository/items/items.component';
import {AuthGuard} from 'auth.guard';
import {SharedModule} from 'core-modules/shared/shared.module';


let routes : Routes = [
  { path : 'dashboard' , component:DashboardComponent , canActivate : [AuthGuard],
    children :[
      {path : 'repository/items' , component : RepositoryItemsComponent}
    ]}
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    LayoutModule,
    RepositoryModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
