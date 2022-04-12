import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab1CompletedPage } from './tab1-completed.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1CompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1CompletedPageRoutingModule {}
