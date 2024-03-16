import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCompanyRoutingModule } from './list-company-routing.module';
import { ListCompanyComponent } from './list-company.component';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CompanyModule } from 'src/app/dialog/company/company.module';
import { ConfirmDialogModule } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    ListCompanyComponent
  ],
  imports: [
    CommonModule,
    ListCompanyRoutingModule,
    MaterialModule,
    NgxPaginationModule,
    CompanyModule,
    ConfirmDialogModule
  ]
})
export class ListCompanyModule { }
