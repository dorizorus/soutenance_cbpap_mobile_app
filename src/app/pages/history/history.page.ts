import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/Order';
import {OrderService} from '../../services/order.service';

@Component({
    selector: 'app-historique',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    public history: Order[];

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
        this.history = this.orderService.getOrders();
    }

    onClickOrder(order: Order) {
        this.orderService.setOrder(order);
    }


}
