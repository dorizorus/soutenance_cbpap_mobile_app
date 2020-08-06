import {NgModule} from '@angular/core';
import {HeaderComponent} from "./header.component";
import {CartPage} from "../pages/cart/cart.page";
import {SingleOrderPage} from "../pages/single-order/single-order.page";
import {OrderValidationPage} from "../pages/order-validation/order-validation.page";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

@NgModule({
    exports: [HeaderComponent, CartPage, SingleOrderPage, OrderValidationPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [HeaderComponent, CartPage, SingleOrderPage, OrderValidationPage]
})
export class ComponentsModule {
}
