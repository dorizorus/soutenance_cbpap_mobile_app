import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleCommandePageRoutingModule } from './single-commande-routing.module';

import { SingleCommandePage } from './single-commande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleCommandePageRoutingModule
  ],
  declarations: [SingleCommandePage]
})
export class SingleCommandePageModule {}
