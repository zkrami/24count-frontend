import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from './layout/layout.module';
import {RepositoryItemsModule} from './repository-items/repository-items.module';
import {ItemsComponent as RepositoryItemsComponent} from './repository-items/items/items.component';
import {AuthGuard} from 'guards/auth.guard';
import {SharedModule} from 'core-modules/shared/shared.module';

import {PharmacyOrdersModule} from 'site/dashboard/pharmacy-orders/pharmacy-orders.module';
import {CreateComponent as OrderCreateComponent} from 'site/dashboard/pharmacy-orders/create/create.component';
import {ListComponent as OrdersListComponent} from 'site/dashboard/pharmacy-orders/list/list.component';
import {EditComponent as OrderEditComponent} from 'site/dashboard/pharmacy-orders/edit/edit.component';
import {ListComponent as RepositoryListComponent} from 'site/dashboard/repository/list/list.component';
import {RepositoryModule} from 'site/dashboard/repository/repository.module';
import {DetailsComponent as RepositoryDetailsComponent} from 'site/dashboard/repository/details/details.component';
import {RepositoryGuard} from 'guards/repository.guard';
import {PharmacistGuard} from 'guards/pharmacist.guard';
import {ListComponent as RepositoryOrdersListComponent} from 'site/dashboard/repository-orders/list/list.component';
import {DetailsComponent as RepositoryOrderEditComponent} from 'site/dashboard/repository-orders/details/details.component';
import {RepositoryOrdersModule} from 'site/dashboard/repository-orders/repository-orders.module';
import {ConfigComponent} from 'site/dashboard/config/config/config.component';
import {ConfigModule} from 'site/dashboard/config/config.module';
import {PharmacyComponent as PharmacyMainComponent} from 'site/dashboard/main/pharmacy/pharmacy.component';
import {MainModule} from 'site/dashboard/main/main.module';
import {MainComponent} from 'site/dashboard/main/main/main.component';


let routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { //user
        path: '', canActivateChild: [AuthGuard], children: [

          {path: 'config', component: ConfigComponent},
          {path: 'main', component: MainComponent}
        ]
      },
      {
        // repository
        path: '', canActivateChild: [RepositoryGuard], children: [

          {path: 'repository/items', component: RepositoryItemsComponent},
          {path: 'repository/orders/:id/edit', component: RepositoryOrderEditComponent},
          {path: 'repository/orders', component: RepositoryOrdersListComponent},

        ]
      },
      {
        // pharmacy
        path: '', canActivateChild: [PharmacistGuard], children: [
          {path: 'repositories', component: RepositoryListComponent},
          {path: 'repositories/:id', component: RepositoryDetailsComponent},
          {path: 'pharmacy/orders/create/:repository', component: OrderCreateComponent},
          {path: 'pharmacy/orders/:id/edit', component: OrderEditComponent},
          {path: 'pharmacy/orders', component: OrdersListComponent},
          {path: 'pharmacy/main', component: PharmacyMainComponent}
        ]
      }
      , // default
      {
        path: '**', pathMatch: 'full', redirectTo: '/dashboard/main'
      }

    ]
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    LayoutModule,
    RepositoryItemsModule,
    SharedModule,
    PharmacyOrdersModule,
    RepositoryModule,
    RepositoryOrdersModule,
    ConfigModule,
    MainModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule {
}
