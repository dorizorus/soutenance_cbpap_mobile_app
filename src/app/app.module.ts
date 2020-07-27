import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CartPage} from "./pages/cart/cart.page";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SingleCommandePage } from './pages/single-commande/single-commande.page';
import {HeaderComponent} from "./header/header.component";
import {ValidationComPage} from "./pages/validation-com/validation-com.page";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, CartPage, SingleCommandePage, HeaderComponent, ValidationComPage],
  entryComponents: [CartPage, SingleCommandePage, ValidationComPage],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
