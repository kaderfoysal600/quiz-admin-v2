import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetAlarmRoutingModule } from './set-alarm-routing.module';
import { SetAlarmComponent } from './set-alarm.component';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    SetAlarmComponent
  ],
  imports: [
    CommonModule,
    SetAlarmRoutingModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule
  ]
})
export class SetAlarmModule { }
