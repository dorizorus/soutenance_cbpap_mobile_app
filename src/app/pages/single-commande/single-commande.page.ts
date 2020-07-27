import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/Order";
import {OrderService} from "../../services/order.service";
import {AlertController, NavController} from "@ionic/angular";

@Component({
    selector: 'app-single-commande',
    templateUrl: './single-commande.page.html',
    styleUrls: ['./single-commande.page.scss'],
})
export class SingleCommandePage implements OnInit {
    order: Order;
    total: number = 0;
    canEdit: boolean;

    constructor(private orderService: OrderService,
                private alertController: AlertController,
                private navController: NavController) {
    }

    ngOnInit(): void {
        this.order = this.orderService.getOrder();
        this.total = 0;
        this.order.orderLines.forEach(value => this.total += (value.article.finalPrice * value.quantity));

        let limite: Date = this.order.dateCommande;
        limite.setHours(limite.getHours() + 3);

        if (limite.getTime() > new Date().getTime()) {
            this.canEdit = true;
        }
    }

    updateCart() {
        this.orderService.setCart(this.order.orderLines);
    }

    async alertConfirm() {
        const alert = await this.alertController.create({
            header: "Annulation d'une commande",
            //cssClass: 'maClasseCss'
            message: 'Êtes-vous certain de vouloir annuler cette commande ?',
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
        // todo ici envoyer pdf annulation commande & supprimer commande dans le app preference
        this.navController.navigateBack(['/nav/article']);
    }
}
