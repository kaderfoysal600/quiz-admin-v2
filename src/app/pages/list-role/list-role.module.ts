import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoleRoutingModule } from './list-role-routing.module';
import { ListRoleComponent } from './list-role.component';
import { RoleDialogModule } from 'src/app/dialog/role-dialog/role-dialog.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ConfirmDialogModule } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListRoleComponent
  ],
  imports: [
    CommonModule,
    ListRoleRoutingModule,
    RoleDialogModule,
    MaterialModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListRoleModule { }
