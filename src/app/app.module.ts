import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CartPage} from "./pages/cart/cart.page";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SingleOrderPage } from './pages/single-order/single-order.page';
import {HeaderComponent} from "./header/header.component";
import {OrderValidationPage} from "./pages/order-validation/order-validation.page";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, CartPage, SingleOrderPage, HeaderComponent, OrderValidationPage],
  entryComponents: [CartPage, SingleOrderPage, OrderValidationPage],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
