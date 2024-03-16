import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetAlarmComponent } from './set-alarm.component';

const routes: Routes = [{
  path:'',
  component:SetAlarmComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetAlarmRoutingModule { }
