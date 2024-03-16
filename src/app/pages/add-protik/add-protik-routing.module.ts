import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProtikComponent } from './add-protik.component';

const routes: Routes = [{
  path: '',
  component:AddProtikComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProtikRoutingModule { }
