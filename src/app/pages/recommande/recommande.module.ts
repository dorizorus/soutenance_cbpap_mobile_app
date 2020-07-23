import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommandePageRoutingModule } from './recommande-routing.module';

import { RecommandePage } from './recommande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommandePageRoutingModule
  ],
  declarations: [RecommandePage]
})
export class RecommandePageModule {}
