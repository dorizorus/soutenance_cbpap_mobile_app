import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ContactPageModule } from '../contact/contact.module';

@Component({
  selector: 'app-delete-acc',
  templateUrl: './delete-acc.page.html',
  styleUrls: ['./delete-acc.page.scss'],
})
export class DeleteAccPage implements OnInit {

  constructor(private modalController : ModalController,
              private navCtrl : NavController) {  }

  ngOnInit() {
  }

  // ne marche pas. Modal créer dans tabs
  async onCreationContact() {
    const modal = await this.modalController.create({
      component: ContactPageModule,
      cssClass:'modal-pop',
      backdropDismiss:true
    });
    return await modal.present();
  }

  retourArriere() {
    this.navCtrl.navigateBack(['/settings']);
  }

}
