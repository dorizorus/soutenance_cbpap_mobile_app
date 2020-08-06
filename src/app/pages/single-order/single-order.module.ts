import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleOrderPageRoutingModule} from './single-order-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleOrderPageRoutingModule,
    ],
})
export class SingleOrderPageModule {
}
