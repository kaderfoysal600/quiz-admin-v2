import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MqtfLogsComponent } from './mqtf-logs.component';

const routes: Routes = [
  {
    path:'',
    component:MqtfLogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MqtfLogsRoutingModule { }
