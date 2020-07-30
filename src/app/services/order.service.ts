import {Injectable} from '@angular/core';
import {Order} from "../models/Order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private order: Order;

    constructor() {
    }

    // transfère une order (utilise dans l'history)
    setOrder(order: Order) {
        this.order = order;
    }

    getOrder(): Order {
        return this.order;
    }
}
