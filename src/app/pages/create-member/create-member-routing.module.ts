import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMemberComponent } from './create-member.component';

const routes: Routes = [
  {
    path: '',
    component: CreateMemberComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMemberRoutingModule {}
