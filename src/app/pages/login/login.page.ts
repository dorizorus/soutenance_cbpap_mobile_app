import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import {ContactPageModule} from "../contact/contact.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private navCtrl : NavController,
              private modalController : ModalController) { }

  // permet d'amener vers la route x
  async navTabs() {
    this.navCtrl.navigateForward(['/nav/article']); 
  }

  // censé faire apparaitre la modal mais ne marche pas non plus. La modal est créer dans tabs.ts
  async onContactPop() {
    const modal = await this.modalController.create({
      component: ContactPageModule,
      cssClass:'modal-pop',
      backdropDismiss:true
    });
    return await modal.present();
  }

}
