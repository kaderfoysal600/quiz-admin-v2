import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserDialogComponent } from './view-user-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [ViewUserDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MaterialModule
  ],
  exports:[ViewUserDialogComponent]
})
export class ViewUserDialogModule { }
