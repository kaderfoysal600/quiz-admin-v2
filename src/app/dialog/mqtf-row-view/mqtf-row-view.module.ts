import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqtfRowViewComponent } from './mqtf-row-view.component';



@NgModule({
  declarations: [
    MqtfRowViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MqtfRowViewComponent
  ]
})
export class MqtfRowViewModule { }
