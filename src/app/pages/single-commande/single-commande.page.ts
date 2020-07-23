import {Component, OnInit} from '@angular/core';
import {Commande} from "../../models/Commande";
import {OrderService} from "../../services/order.service";
import {AlertController, NavController} from "@ionic/angular";

@Component({
    selector: 'app-single-commande',
    templateUrl: './single-commande.page.html',
    styleUrls: ['./single-commande.page.scss'],
})
export class SingleCommandePage implements OnInit {
    commande: Commande;
    total: number = 0;
    canEdit:boolean;

    constructor(private orderService: OrderService,
                private alertController:AlertController,
                private navController:NavController) {
    }

    ngOnInit(): void {
        this.commande = this.orderService.getCommande();
        this.total = 0;
        this.commande.orderLines.forEach(value => this.total += (value.article.finalPrice * value.quantity));

        let limite:Date = this.commande.dateCommande;
        limite.setHours(limite.getHours() + 3);

        if(limite.getTime() > new Date().getTime()){
            this.canEdit = true;
        }
    }

    updatePanier() {
        this.orderService.setPanier(this.commande.orderLines);
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
                        this.envoiAnnulation();
                    }
                }
            ]
        });
        await alert.present();
    }

    private envoiAnnulation() {
        // todo ici envoyer pdf annulation commande & supprimer commande dans le app preference
        this.navController.navigateBack(['/nav/article']);
    }
}
