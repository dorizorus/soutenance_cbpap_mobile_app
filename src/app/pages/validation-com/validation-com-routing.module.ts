import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationComPage } from './validation-com.page';

const routes: Routes = [
  {
    path: '',
    component: ValidationComPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationComPageRoutingModule {}
