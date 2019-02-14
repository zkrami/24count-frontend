import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PharmacyComponent} from './pharmacy/pharmacy.component';
import {PharmacyRequirementsComponent} from './pharmacy-requirements/pharmacy-requirements.component';
import {MainComponent} from './main/main.component';
import {SharedModule} from 'core-modules/shared/shared.module';
import {MaterialComponentsModule} from 'core-modules/material-components/material-components.module';
import {UIModule} from 'site/dashboard/ui/ui.module';

@NgModule({
  declarations: [PharmacyComponent, PharmacyRequirementsComponent, MainComponent],
  imports: [
    SharedModule,
    MaterialComponentsModule,
    UIModule,
    CommonModule
  ],
  exports: [
    PharmacyComponent, MainComponent
  ]
})
export class MainModule {
}
