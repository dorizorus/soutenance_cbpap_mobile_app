import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../models/Order';
import {OrderService} from '../../services/order.service';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-historique',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, OnDestroy {

    public history: Order[];

    ordersListSub: Subscription;

    constructor(private orderService: OrderService, private userService: UserService) {
    }

    ngOnInit() {
        this.orderService.getOrders(this.userService.getActiveCustomer().id);
        this.ordersListSub = this.orderService.ordersList$.subscribe(history => {this.history = history;
            console.log(history)});
    }

    onClickOrder(order: Order) {
        this.orderService.setOrder(order);
    }

    ngOnDestroy() {
        this.ordersListSub.unsubscribe();
    }


}
