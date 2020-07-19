import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {SettingsPage} from "../pages/settings/settings.page";
import { OrderService } from '../services/order.service';
import { PanierPage } from '../pages/panier/panier.page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{

    quantityTotal : number;
    quantityObsTotal : Observable<number>;
    constructor(private modalController:ModalController,
                private navCtrl : NavController,
                private orderService : OrderService
                ) {
                    
                 }

    ngOnInit() {
        this.orderService.myData.subscribe((data) => {
            this.quantityTotal = data;
            console.log("Ma quantité vaut " + this.quantityTotal);
        })
      //this.updateQuantity();
    }

    /*
    // Censé se lancer a chaque changement dans la quantité mais marche pas
    updateQuantity() {
        console.log("Je suis dans l'update")
        this.orderService.quantityObservable.subscribe(
            (quantite : number) => {
                console.log("Quantité vaut" + quantite);
                this.quantityTotal = quantite;
                console.log(this.quantityTotal)
                console.log("Update en cours");
            }
        )
    }
    */

    async goPanier() {
        const modal = await this.modalController.create({
            component: PanierPage,
            backdropDismiss:true,
            cssClass:'modal-pop'
        });
        return await modal.present();
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
