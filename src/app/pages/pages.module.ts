import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from '../material/material.module';
import {ImageCropperModule} from 'ngx-image-cropper';
@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    MatMenuModule,
    MaterialModule,
    ImageCropperModule,
  ]
})
export class PagesModule { }
