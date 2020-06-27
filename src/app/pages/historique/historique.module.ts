import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePageRoutingModule } from './historique-routing.module';

import { HistoriquePage } from './historique.page';
import {HeaderComponent} from "../../header/header.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriquePageRoutingModule
  ],
  exports: [HeaderComponent],
  declarations: [HistoriquePage, HeaderComponent]
})
export class HistoriquePageModule {}
