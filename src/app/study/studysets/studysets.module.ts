import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudysetsPageRoutingModule } from './studysets-routing.module';

import { StudysetsPage } from './studysets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudysetsPageRoutingModule
  ],
  declarations: [StudysetsPage]
})
export class StudysetsPageModule {}
