import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialComponentsModule} from '../material-components/material-components.module';
import {FormsModule} from '@angular/forms';


let modules = [MaterialComponentsModule , FormsModule];
@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , ...modules
  ] ,
  exports : [ ...modules]
})
export class SharedModule { }
