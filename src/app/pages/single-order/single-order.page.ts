import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/Order";
import {OrderService} from "../../services/order.service";
import {AlertController, NavController, ToastController} from "@ionic/angular";
import { cloneDeep } from 'lodash';
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'app-single-order',
    templateUrl: './single-order.page.html',
    styleUrls: ['./single-order.page.scss'],
})
export class SingleOrderPage implements OnInit {
    order: Order;
    total: number = 0;
    canEdit: boolean;

    constructor(private orderService: OrderService,
                private cartService:CartService,
                private alertController: AlertController,
                private navController: NavController,
                private toastController : ToastController) {}

    ngOnInit(): void {
        this.order = this.orderService.getOrder();
        this.total = 0;
        this.order.orderLines.forEach(value => this.total += (value.article.finalPrice * value.quantity));

        let limite: Date = this.order.orderDate;
        limite.setHours(limite.getHours() + 3);

        if (limite.getTime() > new Date().getTime()) {
            this.canEdit = true;
        }
    }

    async alertConfirm() {
        const alert = await this.alertController.create({
            header: "Annulation d'une order",
            message: 'Êtes-vous certain de vouloir annuler cette order ?',
            buttons: [
                {
                    text: 'Non',
                    //cssClass: 'secondary',
                    role: 'cancel',
                    handler: () => {
                        console.log('Annulation de la suppression');
                    }
                }, {
                    text: "Oui",
                    handler: () => {
                        this.sendCancel();
                    }
                }
            ]
        });
        await alert.present();
    }

    private sendCancel() {
        // todo ici envoyer pdf annulation order & supprimer order dans le app preference
        this.navController.navigateBack(['/nav/article']);
    }

    // met a jour le cart dans le service
    updateCart() {
        // création du toast
        this.toastClick();
        // fait un deep clone des lignes de la order
        const newCart = cloneDeep(this.order.orderLines);
        // on met à jour le panier avec le clone
        this.cartService.setCart(newCart);
        this.navController.navigateBack(['/nav/article']);
    }

    // génère un toast pour indiquer le transfert de panier
    async toastClick() {
        const toast = await this.toastController.create({
          color: 'green',
          position: 'top',
          duration: 3000,
          message: 'Commande bien transférée!'
        });
  
        await toast.present();
      }
}
