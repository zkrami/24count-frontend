import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RepositoryModule} from './repository/repository.module';

const routes: Routes = [



];

@NgModule({
  imports: [RouterModule.forRoot(routes) , RepositoryModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
