import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from 'site/auth/login/login.component';
import {AuthModule} from 'site/auth/auth.module';

const routes: Routes = [


  {path :'login' , component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)  , AuthModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
