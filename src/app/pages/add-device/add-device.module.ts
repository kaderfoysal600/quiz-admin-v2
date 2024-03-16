import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDeviceRoutingModule } from './add-device-routing.module';
import { AddDeviceComponent } from './add-device.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogModule } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.module';
import { EditCompanyDeviceModule } from 'src/app/dialog/edit-company-device/edit-company-device.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AddDeviceComponent
  ],
  imports: [
    CommonModule,
    AddDeviceRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ConfirmDialogModule,
    EditCompanyDeviceModule,
    NgxSpinnerModule
  ]
})
export class AddDeviceModule { }
