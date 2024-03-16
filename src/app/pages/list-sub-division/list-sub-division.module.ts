import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSubDivisionComponent } from './list-sub-division.component';
import { ListSubDivisionRoutingModule } from './list-sub-division-routing.module';
import { ConfirmDialogModule } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.module';
import { SubDivisionModule } from 'src/app/dialog/sub-division/sub-division.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [ListSubDivisionComponent],
  imports: [
    CommonModule,
    ListSubDivisionRoutingModule,
    ConfirmDialogModule,
    SubDivisionModule,
    MaterialModule,
  ],
})
export class ListSubDivisionModule {}
