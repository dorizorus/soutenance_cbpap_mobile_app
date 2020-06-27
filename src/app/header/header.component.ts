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
    async goSettings() {
        const modal = await this.modalController.create({
            component: SettingsPage,
            backdropDismiss:true
        });
        return await modal.present();
    }
}
