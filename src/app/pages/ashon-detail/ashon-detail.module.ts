import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AshonDetailComponent } from './ashon-detail.component';
import { AshonDetailRoutingModule } from './ashon-detail-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [AshonDetailComponent],
  imports: [
    CommonModule,
    AshonDetailRoutingModule,
    MaterialModule,
    MatIconModule,
  ],
})
export class AshonDetailModule {}
