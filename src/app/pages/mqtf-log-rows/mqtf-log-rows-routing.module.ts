import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MqtfLogRowsComponent } from './mqtf-log-rows.component';

const routes: Routes = [{
  path:'',
  component:MqtfLogRowsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MqtfLogRowsRoutingModule { }
