import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,

    children: [
      {
        path: '',
        redirectTo: 'list-divisions',
        pathMatch: 'full',
      },
      {
        path: 'list-divisions',
        loadChildren: () =>
          import('./list-tasks/list-tasks.module').then(
            (m) => m.ListDivisionsModule
          ),
      },
      
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
