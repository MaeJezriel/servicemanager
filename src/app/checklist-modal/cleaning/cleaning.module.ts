import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CleaningPageRoutingModule } from './cleaning-routing.module';

import { CleaningPage } from './cleaning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CleaningPageRoutingModule
  ],
  declarations: [CleaningPage]
})
export class CleaningPageModule {}
