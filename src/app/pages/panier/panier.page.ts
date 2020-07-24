import {Component, OnInit} from '@angular/core';
import {OrderService} from 'src/app/services/order.service';
import {OrderLine} from 'src/app/models/OrderLine';
import {ModalController} from "@ionic/angular";
import {ValidationComPage} from "../validation-com/validation-com.page";

@Component({
    selector: 'app-panier',
    templateUrl: './panier.page.html',
    styleUrls: ['./panier.page.scss'],
})
// dans le cas d'un "can't bind" to ngFor", ajouter PanierPage à app.module.ts dans declarations & entryComponents
export class PanierPage implements OnInit {

    nombreQuantite: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    panier: OrderLine[];
    total: number;
    remise:boolean = false;

    constructor(private orderService: OrderService,
                private modalController:ModalController) {
    }

    ngOnInit() {
        // on subscribe aux données (ici un tableau de ligne de commande du panier), dès qu'un changement est detecté on les récupère
        this.orderService.myData.subscribe(data => {
                this.panier = data;
            }
        )
        this.updateTotal();
    }

    onDismiss() {
        this.modalController.dismiss();
    }

    deleteLine( ligne : OrderLine) {
        this.panier.splice(this.panier.indexOf(ligne),1);
        this.orderService.setPanier(this.panier);
    }

    deleteAll() {
        this.orderService.setPanier([]);
        this.onDismiss();
    }

    toggled() {
        this.remise = !this.remise;
        this.updateTotal();
    }

    private updateTotal() : number {
        // Si le toggle est activé on applique la remise
        this.total = 0;
        if (!this.remise)
            this.panier.forEach(value => this.total += (value.article.finalPrice * value.quantity));
        else
            this.panier.forEach(value => this.total += ((value.article.finalPrice * value.quantity) * 0.95));
        return this.total;
    }

    async onCommandeValid() {
        this.modalController.dismiss();
        const modal = await this.modalController.create({
            component: ValidationComPage,
            cssClass: 'modal-pop',
            backdropDismiss: true
        });
        return await modal.present();
    }

    updatePanier() {
        this.orderService.setPanier(this.panier);
    }
}
