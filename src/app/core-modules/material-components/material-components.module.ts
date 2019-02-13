import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule} from '@angular/material';


let components = [MatButtonModule, MatCheckboxModule, MatFormFieldModule
  , MatInputModule, MatIconModule, MatCardModule, MatGridListModule,
  MatTableModule, MatPaginatorModule, MatAutocompleteModule, MatDialogModule, MatSelectModule , MatSortModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...components
  ]
  , exports: [
    ...components
  ]
})
export class MaterialComponentsModule {
}
