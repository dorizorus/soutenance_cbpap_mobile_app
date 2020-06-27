import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitsPage } from './produits.page';
import { ProduitsPageRoutingModule} from "./produits-routing.module";
import {HeaderComponent} from "../../header/header.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitsPageRoutingModule
  ],
  exports: [HeaderComponent],
  declarations: [ProduitsPage, HeaderComponent]
})
export class ProduitsPageModule {}
