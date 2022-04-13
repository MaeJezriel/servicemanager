import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartjobModalPageRoutingModule } from './startjob-modal-routing.module';

import { StartjobModalPage } from './startjob-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartjobModalPageRoutingModule
  ],
  declarations: [StartjobModalPage]
})
export class StartjobModalPageModule {}
