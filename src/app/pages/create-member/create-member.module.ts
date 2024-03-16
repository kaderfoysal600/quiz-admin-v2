import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMemberComponent } from './create-member.component';
import { CreateMemberRoutingModule } from './create-member-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [CreateMemberComponent],
  imports: [
    CommonModule,
    CreateMemberRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class CreateMemberModule {}
