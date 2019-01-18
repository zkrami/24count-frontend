import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialComponentsModule} from '../material-components/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

let modules = [MaterialComponentsModule , ReactiveFormsModule ,FormsModule  ];
@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , ...modules
  ] ,
  exports : [ ...modules]
})
export class SharedModule { }
