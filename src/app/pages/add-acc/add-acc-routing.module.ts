import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAccPage } from './add-acc.page';

const routes: Routes = [
  {
    path: '',
    component: AddAccPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAccPageRoutingModule {}
