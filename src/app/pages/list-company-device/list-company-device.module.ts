import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCompanyDeviceRoutingModule } from './list-company-device-routing.module';
import { ListCompanyDeviceComponent } from './list-company-device.component';


@NgModule({
  declarations: [
    ListCompanyDeviceComponent
  ],
  imports: [
    CommonModule,
    ListCompanyDeviceRoutingModule
  ]
})
export class ListCompanyDeviceModule { }
