import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDeviceComponent } from './list-device.component';

const routes: Routes = [{
  path:'',
  component:ListDeviceComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDeviceRoutingModule { }
