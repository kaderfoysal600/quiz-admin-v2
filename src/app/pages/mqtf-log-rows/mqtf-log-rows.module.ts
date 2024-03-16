import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MqtfLogRowsRoutingModule } from './mqtf-log-rows-routing.module';
import { MqtfLogRowsComponent } from './mqtf-log-rows.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material/material.module';
import { MqtfRowViewModule } from 'src/app/dialog/mqtf-row-view/mqtf-row-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MqtfLogRowsComponent
  ],
  imports: [
    CommonModule,
    MqtfLogRowsRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    MaterialModule,
    MqtfRowViewModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class MqtfLogRowsModule { }
