import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'set-detail', loadChildren: './set-detail/set-detail.module#SetDetailPageModule' },
  { path: 'practice', loadChildren: './practice/practice.module#PracticePageModule' },
  { path: 'play', loadChildren: './play/play.module#PlayPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
