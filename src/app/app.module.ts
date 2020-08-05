import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CartPage} from './pages/cart/cart.page';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SingleOrderPage } from './pages/single-order/single-order.page';
import {HeaderComponent} from './header/header.component';
import {OrderValidationPage} from './pages/order-validation/order-validation.page';
import {FormsModule} from '@angular/forms';

// import pour le data storage local. On le met aussi dans l'import
import { IonicStorageModule } from '@ionic/storage';

// import pour la connexion et pouvoir faire des gets donc. Ajout dans import
import { HttpClientModule }  from '@angular/common/http';

//imports nécessaires pour générer pdf et créer un mail
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, CartPage, SingleOrderPage, HeaderComponent, OrderValidationPage],
  entryComponents: [CartPage, SingleOrderPage, OrderValidationPage],
    imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
      UserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File, FileOpener, EmailComposer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
