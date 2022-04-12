import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1CompletedPageRoutingModule } from './tab1-completed-routing.module';

import { Tab1CompletedPage } from './tab1-completed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1CompletedPageRoutingModule
  ],
  declarations: [Tab1CompletedPage]
})
export class Tab1CompletedPageModule {}
