import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoixComptePage } from './choix-compte.page';
import { SettingsPage } from '../settings/settings.page';

const routes: Routes = [
  {
    path: '',
    component: ChoixComptePage
  },
  {
    path: 'settings',
    component: SettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoixComptePageRoutingModule {}
