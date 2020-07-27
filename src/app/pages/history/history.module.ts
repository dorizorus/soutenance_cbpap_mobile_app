import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import {HeaderComponent} from "../../header/header.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule
  ],
  exports: [HeaderComponent],
  declarations: [HistoryPage, HeaderComponent]
})
export class HistoryPageModule {}
