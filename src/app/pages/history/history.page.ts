import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../models/Order';
import {OrderService} from '../../services/order.service';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {Customer} from "../../models/Customer";

@Component({
    selector: 'app-historique',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, OnDestroy {

    public history: Order[];

    customer: Customer;
    ordersListSub: Subscription;
    activeCustomerSub: Subscription;

    constructor(private orderService: OrderService, private userService: UserService) {
    }

    ngOnInit() {
        this.activeCustomerSub = this.userService.activeCustomer$.subscribe(customer => {
            this.customer = customer;
            this.orderService.getOrders(this.userService.getActiveCustomer().id);
        })

        this.ordersListSub = this.orderService.ordersList$.subscribe(history => {
            this.history = history;
            });
    }

    onClickOrder(order: Order) {
        this.orderService.setOrder(order);
    }

    ngOnDestroy() {
        this.ordersListSub.unsubscribe();
        this.activeCustomerSub.unsubscribe();
    }


}
