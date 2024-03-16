import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceAlarmComponent } from './device-alarm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [
    DeviceAlarmComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  exports : [
    DeviceAlarmComponent
  ]
})
export class DeviceAlarmModule { }
