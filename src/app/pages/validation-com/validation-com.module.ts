import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidationComPageRoutingModule } from './validation-com-routing.module';

import { ValidationComPage } from './validation-com.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidationComPageRoutingModule
  ],
  declarations: [ValidationComPage]
})
export class ValidationComPageModule {}
