import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleCommandePage } from './single-commande.page';

const routes: Routes = [
  {
    path: '',
    component: SingleCommandePage
  },
  {
    path:'recommande',
    loadChildren: () => import('../recommande/recommande.module').then( m => m.RecommandePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleCommandePageRoutingModule {}
