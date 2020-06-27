import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsPage } from './produits.page';
import {SingleProduitPage} from "../single-produit/single-produit.page";

const routes: Routes = [
  {
    path: '',
    component:ProduitsPage
  },
  {
    path: 'single-produit',
    loadChildren: () => import('../single-produit/single-produit.module').then(m => m.SingleProduitPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsPageRoutingModule {}
