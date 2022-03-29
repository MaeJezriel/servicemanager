import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cleaning',
    loadChildren: () => import('./checklist-modal/cleaning/cleaning.module').then( m => m.CleaningPageModule)
  },
  {
    path: 'calibration',
    loadChildren: () => import('./checklist-modal/calibration/calibration.module').then( m => m.CalibrationPageModule)
  },
  
  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
