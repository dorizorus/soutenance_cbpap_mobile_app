import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleCommandePage } from './single-commande.page';

const routes: Routes = [
  {
    path: '',
    component: SingleCommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleCommandePageRoutingModule {}
