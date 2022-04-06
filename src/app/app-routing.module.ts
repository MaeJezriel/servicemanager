import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
 

const routes: Routes = [
  {
    path: 'members',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: 'cleaning',
    loadChildren: () => import('./checklist-modal/cleaning/cleaning.module').then( m => m.CleaningPageModule)
  },
  {
    path: 'calibration',
    loadChildren: () => import('./checklist-modal/calibration/calibration.module').then( m => m.CalibrationPageModule)
  },
  {
    path: 'signature',
    loadChildren: () => import('./customer-modal/signature/signature.module').then( m => m.SignaturePageModule)
  },
  {
    path: 'view-details',
    loadChildren: () => import('./history-modal/view-details/view-details.module').then( m => m.ViewDetailsPageModule)
  },

  
  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
