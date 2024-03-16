import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCompanyDeviceComponent } from './edit-company-device.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditCompanyDeviceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EditCompanyDeviceComponent,
  
  ],
})
export class EditCompanyDeviceModule { }
