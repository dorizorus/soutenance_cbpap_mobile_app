import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/Order";

@Component({
    selector: 'app-recommande',
    templateUrl: './recommande.page.html',
    styleUrls: ['./recommande.page.scss'],
})
export class RecommandePage implements OnInit {
    order: Order;
    total: number = 0;
    warehouseRetrieval: boolean = false;

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
        this.order = this.orderService.getOrder();
        this.updateTotal();
    }

    toggled() {
        this.warehouseRetrieval = !this.warehouseRetrieval;
        this.updateTotal();
    }


    // met a jour le total du cart en fonction des articles & de leur quantite & du discount, selon leur finalPrice
    private updateTotal() {
        // Si le toggle est activé on applique la remise
        this.total = 0;
        if (!this.warehouseRetrieval)
            this.order.orderLines.forEach(value => this.total += (value.article.finalPrice * value.quantity));
        else
            this.order.orderLines.forEach(value => this.total += ((value.article.finalPrice * value.quantity) * 0.95));
        if (this.total < 250 && !this.warehouseRetrieval)
            this.total += 20;
    }

    // todo faire en sorte d'envoyer pdf par mail
    startOrder() {

    }

    // met a jour le cart dans le service
    updateCart() {
        this.orderService.setCart(this.order.orderLines);
    }
}
