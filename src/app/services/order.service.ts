import {Injectable} from '@angular/core';
import {Order} from "../models/Order";
import {BehaviorSubject} from 'rxjs';
import {OrderLine} from '../models/OrderLine';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    // todo faire 2 services - 1 comande, 1 cart
    private order: Order;
    private orderLines: OrderLine[];
    private total: number;
    public myData$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]);
    public toggle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {}

    // transfère une order (utilise dans l'history)
    setOrder(cart: Order) {
        this.order = cart;
    }

    getOrder(): Order {
        return this.order;
    }

    // transfère un cart ( utilisé dans article, cart et header)
    setCart(cart: OrderLine[]) {
        this.orderLines = cart;
        this.myData$.next(this.orderLines);
    }

    getPanier(): OrderLine[] {
        return this.orderLines;
    }

    // transfère le montant total du cart (utilisé dans la modal ValidationCom)
    setTotal(total: number) {
        this.total = total;
    }

    getTotal() {
        return this.total;
    }

    setStatus(warehouseRetrieval: boolean) {
        this.toggle$.next(warehouseRetrieval)
    }

    getStatus() {
        return this.toggle$.getValue();
    }
}
