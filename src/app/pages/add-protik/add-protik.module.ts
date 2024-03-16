import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProtikComponent } from './add-protik.component';
import { AddProtikRoutingModule } from './add-protik-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [AddProtikComponent],
  imports: [
    CommonModule,
    AddProtikRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AddProtikModule {}
