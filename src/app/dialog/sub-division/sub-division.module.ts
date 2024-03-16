import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubDivisionComponent } from './sub-division.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [SubDivisionComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [SubDivisionComponent],
})
export class SubDivisionModule {}
