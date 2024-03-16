import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCompanyComponent } from './list-company.component';

const routes: Routes = [{
  path:'',
  component:ListCompanyComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCompanyRoutingModule { }
