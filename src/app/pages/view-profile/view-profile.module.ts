import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProfileRoutingModule } from './view-profile-routing.module';
import { ViewProfileComponent } from './view-profile.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProfileEditModule } from 'src/app/dialog/profile-edit/profile-edit.module';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    ViewProfileRoutingModule,
    NgxSpinnerModule,
    ProfileEditModule,
    MatIconModule,
    MaterialModule,
    MatIconModule
  ]
})
export class ViewProfileModule { }
