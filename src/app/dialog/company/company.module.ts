import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule
  ],
  exports:[
    CompanyComponent
  ]
})
export class CompanyModule { }
