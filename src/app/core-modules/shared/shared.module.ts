import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialComponentsModule} from '../material-components/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

let modules = [MaterialComponentsModule , ReactiveFormsModule ,FormsModule , RouterModule  ];
@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , ...modules
  ] ,
  exports : [ ...modules]
})
export class SharedModule { }
