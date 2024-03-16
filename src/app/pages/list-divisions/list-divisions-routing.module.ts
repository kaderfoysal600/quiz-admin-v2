import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDivisionsComponent } from './list-divisions.component';

const routes: Routes = [{
  path:'',
  component:ListDivisionsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDivisionsRoutingModule { }
