import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoixComptePageRoutingModule } from './choix-compte-routing.module';

import { ChoixComptePage } from './choix-compte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoixComptePageRoutingModule
  ],
  declarations: [ChoixComptePage]
})
export class ChoixComptePageModule {}
