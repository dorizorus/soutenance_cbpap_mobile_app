import {Injectable} from '@angular/core';
import {OrderLine} from "../models/OrderLine";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart: OrderLine[];
    public cart$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]);

    constructor() {
    }

    setCart(cart: OrderLine[]) {
        this.cart = cart;
        this.cart$.next(this.cart);
    }

    getCart(): OrderLine[] {
        return this.cart;
    }
}
