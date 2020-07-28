import {Injectable} from '@angular/core';
import {Order} from "../models/Order";
import {BehaviorSubject} from 'rxjs';
import {OrderLine} from '../models/OrderLine';
import {Article} from '../models/Article';

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
