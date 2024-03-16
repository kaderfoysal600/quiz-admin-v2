import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AshonDetailComponent } from './ashon-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AshonDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AshonDetailRoutingModule {}
