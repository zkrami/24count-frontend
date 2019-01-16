import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatFormField, MatFormFieldModule, MatIcon, MatIconModule, MatInput, MatInputModule} from '@angular/material';



let components = [MatButtonModule , MatCheckboxModule , MatFormFieldModule , MatInputModule , MatIconModule ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule ,
    ...components
  ]
  , exports :[
    ...components
  ]
})
export class MaterialComponentsModule { }
