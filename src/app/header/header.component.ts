import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {SettingsPage} from "../pages/settings/settings.page";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{

    constructor(private modalController:ModalController,
                private navCtrl : NavController) {
    }

    // on intègre la modal dans le constructeur pour pouvoir l'utiliser
    // Async et Await sont présent afin que chaques lignes soient appellé une à une
    
    // permet de créer la modal et de renvoyer au composant
    async goSettings() {
        const modal = await this.modalController.create({
            component: SettingsPage,
            backdropDismiss:true,
            cssClass: 'modal-pop'
        });
    // ouvre la modal
        return await modal.present();
    }

    // permet d'avancer vers une route selectionné. L'avantage c'est que cela créer une animation
    // adéquate (fondu "avant" ou "arrière" d'un back button). Une des nombreuses manière de naviguer
    async versSettings() {
        this.navCtrl.navigateForward('settings');
    }


}
