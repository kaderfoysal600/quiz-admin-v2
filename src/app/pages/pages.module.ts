import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatMenuModule } from '@angular/material/menu';
import { SubMenuModule } from './sub-menu/sub-menu.module';
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
    SubMenuModule,
    MaterialModule,
    ImageCropperModule,
  ]
})
export class PagesModule { }
