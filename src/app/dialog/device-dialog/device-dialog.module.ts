import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDialogComponent } from './device-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeviceDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DeviceDialogComponent
  ]
})
export class DeviceDialogModule { }
