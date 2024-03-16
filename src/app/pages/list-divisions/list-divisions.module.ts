import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDivisionsComponent } from './list-divisions.component';
import { ListDivisionsRoutingModule } from './list-divisions-routing.module';
import { DivisionModule } from 'src/app/dialog/division/division.module';
import { ConfirmDialogModule } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [ListDivisionsComponent],
  imports: [
    CommonModule,
    ListDivisionsRoutingModule,
    DivisionModule,
    ConfirmDialogModule,
    MaterialModule,
  ],
})
export class ListDivisionsModule {}
