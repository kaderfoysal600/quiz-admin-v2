import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSubDivisionComponent } from './list-sub-division.component';

const routes: Routes = [
  {
    path: '',
    component: ListSubDivisionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSubDivisionRoutingModule {}
