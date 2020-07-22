import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleCommandePageRoutingModule } from './single-commande-routing.module';

import { SingleCommandePage } from './single-commande.page';
import {HeaderComponent} from '../../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleCommandePageRoutingModule
  ],
  exports: [HeaderComponent],
  declarations: [SingleCommandePage, HeaderComponent]
})
export class SingleCommandePageModule {}
