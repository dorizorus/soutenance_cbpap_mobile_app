import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryPage } from './history.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage
  },
  {
    path:'single-commande',
    loadChildren: () => import('../single-commande/single-commande.module').then( m => m.SingleCommandePageModule)
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryPageRoutingModule {}
