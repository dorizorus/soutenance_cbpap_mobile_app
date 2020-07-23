import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {SettingsPage} from "../pages/settings/settings.page";
import {OrderService} from '../services/order.service';
import {PanierPage} from '../pages/panier/panier.page';
import {OrderLine} from "../models/OrderLine";
import { UserService } from '../services/user.service';
import { Client } from '../models/Client';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    panier: OrderLine[];
    total: number = 0;
    remise : boolean = false;
    client : Client;

    constructor(private modalController: ModalController,
                private navCtrl: NavController,
                private orderService: OrderService,
                private userService : UserService
    ) {
    }

    ngOnInit() {
        this.orderService.myData.subscribe((data) => {
            this.panier = data;
            this.updateTotal();
        });
        this.client = this.userService.getClient()
    }

    toggled() {
        this.remise = !this.remise;
        this.updateTotal();
    }

    private updateTotal() {
        // Si le toggle est activé on applique la remise
        this.total = 0;
        if (!this.remise)
            this.panier.forEach(value => this.total += (value.article.prixUnitaire * value.quantity));
        else
            this.panier.forEach(value => this.total += ((value.article.prixUnitaire * value.quantity) * 0.95));
    }



    async goPanier() {
        const modal = await this.modalController.create({
            component: PanierPage,
            cssClass: 'modal-article',
            backdropDismiss: true
        });
        return await modal.present();
    }

    // on intègre la modal dans le constructeur pour pouvoir l'utiliser
    // Async et Await sont présent afin que chaques lignes soient appellé une à une

    // permet de créer la modal et de renvoyer au composant
    async goSettings() {
        const modal = await this.modalController.create({
            component: SettingsPage,
            backdropDismiss: true,
            cssClass: 'modal-panier'
        });
        // ouvre la modal
        return await modal.present();
    }

    // permet d'avancer vers une route selectionné. L'avantage c'est que cela créer une animation
    // adéquate (fondu "avant" ou "arrière" d'un back button). Une des nombreuses manière de naviguer
    async versSettings() {
        this.navCtrl.navigateForward('choix-compte');
    }


}
