import {Component, OnInit} from '@angular/core';
import {Commande} from "../../models/Commande";
import {OrderService} from "../../services/order.service";

@Component({
    selector: 'app-single-commande',
    templateUrl: './single-commande.page.html',
    styleUrls: ['./single-commande.page.scss'],
})
export class SingleCommandePage implements OnInit {
    commande: Commande;
    total: number = 0;
    remise: boolean;   

    constructor(private orderService: OrderService) {

    }

    ngOnInit(): void {
        this.commande = this.orderService.getCommande();
        this.total = 0;
        this.commande.orderLines.forEach(value => this.total += (value.article.prixUnitaire * value.quantity));
        this.remise = true;
    }
}