import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCompanyDeviceComponent } from './list-company-device.component';

const routes: Routes = [{
  path:'',
  component: ListCompanyDeviceComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCompanyDeviceRoutingModule { }
