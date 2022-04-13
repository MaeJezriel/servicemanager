import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartjobModalPage } from './startjob-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StartjobModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartjobModalPageRoutingModule {}
