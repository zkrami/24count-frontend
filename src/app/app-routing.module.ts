import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from 'site/auth/login/login.component';
import {AuthModule} from 'site/auth/auth.module';
import {LogoutComponent} from 'site/auth/logout/logout.component';

const routes: Routes = [


  {path :'login' , component: LoginComponent } ,
  {path :'logout' , component: LogoutComponent} ,
  {path :'' , redirectTo : 'login' , pathMatch : 'full'}  ,
  {path :'**' , redirectTo : 'login' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash : true })  , AuthModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
