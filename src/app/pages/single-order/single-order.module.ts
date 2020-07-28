import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleOrderPageRoutingModule} from './single-order-routing.module';

import {SingleOrderPage} from './single-order.page';
import {HeaderComponent} from "../../header/header.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleOrderPageRoutingModule,
    ],
    exports: [HeaderComponent],
    declarations: [HeaderComponent]
})
export class SingleOrderPageModule {
}
