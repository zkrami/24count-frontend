import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialComponentsModule} from '../material-components/material-components.module';


let modules = [MaterialComponentsModule];
@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , ...modules
  ] ,
  exports : [ ...modules]
})
export class SharedModule { }
