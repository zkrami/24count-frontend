import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatFormField, MatFormFieldModule, MatGridListModule, MatIcon, MatIconModule, MatInput, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';



let components = [MatButtonModule , MatCheckboxModule , MatFormFieldModule , MatInputModule , MatIconModule , MatCardModule , MatGridListModule , MatTableModule , MatPaginatorModule  ];

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
