import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriquePage } from './historique.page';
import {SingleCommandePage} from "../single-commande/single-commande.page";

const routes: Routes = [
  {
    path: '',
    component: HistoriquePage
  },
  {
    path:'single-commande',
    component:SingleCommandePage
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriquePageRoutingModule {}
