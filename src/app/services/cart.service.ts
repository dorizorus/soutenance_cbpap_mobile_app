import {Injectable} from '@angular/core';
import {OrderLine} from '../models/OrderLine';
import {BehaviorSubject} from 'rxjs';
import {WarehouseRetService} from './warehouse-ret.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart: OrderLine[] = [];
    public cart$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]);

    private orderLine: OrderLine;
    private orderLineList: OrderLine[] = [];
    public orderLineList$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]); // liste qui apparait sur la page article

    private WHRetrieval: boolean;
    private finalTotal : number;
    private total: number;


    // transfère le montant total du cart (utilisé dans la modal ValidationCom)
    constructor(private warehouseRet: WarehouseRetService) {

        this.warehouseRet.toggle$.subscribe((value) => {
            this.WHRetrieval = value;
            this.updateTotal();
            }
        );
    }


    setCart(cart: OrderLine[]) {
        this.cart = cart;
        this.updateTotal();
        this.cart$.next(this.cart);
    }

    getCart(): OrderLine[] {
        return this.cart;
    }

    setOrderLineList(orderLineList: OrderLine[]) {
        this.orderLineList = orderLineList;
        this.orderLineList$.next(this.orderLineList);
    }

    getOrderLineList(): OrderLine[] {
        return this.orderLineList;
    }

    setOrderLine(orderLine: OrderLine) {
        this.orderLine = orderLine;
    }

    getOrderLine(): OrderLine {
        return this.orderLine;
    }

    private updateTotal() {
        // Si le toggle est activé on applique la WHRetrieval
        this.total = 0;
        if (!this.WHRetrieval) {
            this.cart.forEach(value => this.total += (value.article.unitPrice * value.quantity));
        } else {
            this.cart.forEach(value => this.total += ((value.article.unitPrice * value.quantity) * 0.95));
        }
    }

    setTotal(total: number) {
        this.total = total;
    }

    getTotal() {
        return this.total;
    }

    setFinalTotal( finalTotal : number) {
        this.finalTotal = finalTotal;
    }

    getFinalTotal() {
        return this.finalTotal;
    }
}
