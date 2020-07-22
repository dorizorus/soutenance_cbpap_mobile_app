import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { DeleteAccPage } from '../delete-acc/delete-acc.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path:'delete-acc',
    loadChildren: () => import('../delete-acc/delete-acc.module').then( m => m.DeleteAccPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
