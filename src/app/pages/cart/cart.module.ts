import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanierPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { HeaderComponent } from 'src/app/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanierPageRoutingModule
  ],
  declarations: [CartPage, HeaderComponent]
})
export class PanierPageModule {}
