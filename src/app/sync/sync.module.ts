import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyncPageRoutingModule } from './sync-routing.module';

import { SyncPage } from './sync.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    SyncPageRoutingModule
  ],
  declarations: [SyncPage]
})
export class SyncPageModule {}
