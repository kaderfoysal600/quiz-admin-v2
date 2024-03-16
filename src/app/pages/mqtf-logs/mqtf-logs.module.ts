import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MqtfLogsRoutingModule } from './mqtf-logs-routing.module';
import { MqtfLogsComponent } from './mqtf-logs.component';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATETIME_FORMATS, MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';

@NgModule({
  declarations: [
    MqtfLogsComponent
  ],
  imports: [
    CommonModule,
    MqtfLogsRoutingModule,
    MaterialModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule
  ],
  providers: [
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: {
        parse: {},
        display: {
          dateInput: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          },
          monthInput: {
            month: 'long',
          },
          datetimeInput: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          },
          timeInput: {
            hour: '2-digit',
            minute: '2-digit',
          },
          monthYearLabel: {
            year: 'numeric',
            month: 'short',
          },
          dateA11yLabel: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
          monthYearA11yLabel: {
            year: 'numeric',
            month: 'long',
          },
          popupHeaderDateLabel: {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
          },
        },
      },
    },
  ]
})
export class MqtfLogsModule { }
