import {Injectable} from '@angular/core';
import {Order} from "../models/Order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private order: Order;
    private orders: Order[] = [];

    constructor() {
    }

    // transfère une order (utilise dans l'history)
    setOrder(order: Order) {
        this.order = order;
    }

    getOrder(): Order {
        return this.order;
    }

    getOrders(): Order[] {
        return this.orders;
    }

    setOrders(orders: Order[]) {
        this.orders = orders;
    }

    addOrder(order) {
        this.orders.push(order);
    }

    editOrder(order) {
        const objIndex = this.orders.findIndex((obj => obj.orderNumber == order.orderNumber));
        this.orders[objIndex] = order;
    }
}

