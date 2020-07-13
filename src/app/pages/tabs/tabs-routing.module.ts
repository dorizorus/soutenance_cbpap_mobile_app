import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TabsPage} from "./tabs.page";

const routes: Routes = [
  {
    path: 'tabs',
    component:TabsPage,
    children:[
      {
        path:'produits',
        loadChildren: () => import('../produits/produits.module').then(m => m.ProduitsPageModule)
      },
      {
        path:'historique',
        loadChildren: () => import('../historique/historique.module').then(m => m.HistoriquePageModule)
      },
      {
        path:'documents',
        loadChildren: () => import('../documents/documents.module').then(m => m.DocumentsPageModule)
      },
      {
        path:'contact'
      },
      {
        path: '',
        redirectTo: '/tabs/produits',
        pathMatch: 'full'
      }
    ]
 },
  {
    path:'',
    redirectTo:'/tabs/produits',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
