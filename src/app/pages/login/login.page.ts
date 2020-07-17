import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ContactPageModule } from 'appli_mobile_cbpapiers/src/app/pages/contact/contact.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navCtrl : NavController,
              private modalController : ModalController) { }

  ngOnInit() {
  }
  // permet d'amener vers la route x
  async navTabs() {
    this.navCtrl.navigateForward(['/settings']); // tabs déconnant, ça amene sur settings
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
