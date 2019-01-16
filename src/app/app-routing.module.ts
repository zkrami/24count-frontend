import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemsComponent} from './site/repository/items/items.component';
import {RepositoryModule} from './site/repository/repository.module';
import {LoginComponent} from './site/auth/login/login.component';
import {AuthModule} from './site/auth/auth.module';

const routes: Routes = [


  {path : 'test' , component : ItemsComponent} ,
  {path :'login' , component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)  , AuthModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
