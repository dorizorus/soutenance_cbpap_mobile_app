import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {SettingsPage} from "../pages/settings/settings.page";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
    constructor(private modalController:ModalController) {
    }

    // on intègre la modal dans le constructeur pour pouvoir l'utiliser
    // Async et Await sont la afin que chaque lignes soient appellé une à une
    
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


}
