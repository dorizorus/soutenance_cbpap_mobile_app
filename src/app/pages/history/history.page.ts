import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/Order';
import {OrderService} from '../../services/order.service';
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-historique',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    public history: Order[];

    constructor(private orderService: OrderService, private userService: UserService) {
    }

    ngOnInit() {
        this.history = this.orderService.getOrders(this.userService.getActiveCustomer().id);
    }

    onClickOrder(order: Order) {
        this.orderService.setOrder(order);
    }


}
