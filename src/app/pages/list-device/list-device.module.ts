import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListDeviceRoutingModule } from './list-device-routing.module';
import { ListDeviceComponent } from './list-device.component';
import { DeviceDialogModule } from 'src/app/dialog/device-dialog/device-dialog.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogModule } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.module';
import { DeviceAlarmModule } from 'src/app/dialog/device-alarm/device-alarm.module';


@NgModule({
  declarations: [
    ListDeviceComponent
  ],
  imports: [
    CommonModule,
    ListDeviceRoutingModule,
    DeviceDialogModule,
    MaterialModule,
    MatIconModule,
    NgxPaginationModule,
    ConfirmDialogModule,
    DeviceAlarmModule
  ]
})
export class ListDeviceModule { }
