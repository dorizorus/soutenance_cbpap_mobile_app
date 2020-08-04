import {Injectable} from '@angular/core';
import {OrderLine} from '../models/OrderLine';
import {BehaviorSubject} from 'rxjs';
import {WarehouseRetService} from './warehouse-ret.service';
import {Order} from '../models/Order';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    // private cart: OrderLine[] = [];
    // public cart$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]);
    private cart: Order;
    private readonly initCart: Order;
    public cart$: BehaviorSubject<Order> = new BehaviorSubject<Order>(null);

    private orderLine: OrderLine;
    private orderLineList: OrderLine[] = [];
    public orderLineList$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]); // liste qui apparait sur la page article

    private WHRetrieval: boolean;
    private finalTotal: number;
    private total: number;


    // transfère le montant total du cart (utilisé dans la modal ValidationCom)
    constructor(private warehouseRet: WarehouseRetService) {

        this.initCart = {
            orderNumber: null,
            orderLines: [],
            customer: null,
            orderDate: null
        };

        this.cart = this.initCart;
        this.cart$.next(this.initCart);

        this.warehouseRet.toggle$.subscribe((value) => {
                this.WHRetrieval = value;
                this.updateTotal();
            }
        );
    }

    setCart(cart: Order) {
        this.cart = cart;
        this.updateTotal();
        this.cart$.next(this.cart);
    }

    // vider toutes les orderlines du panier
    resetCartOrderLines() {
        console.log('je reset le panier');
        this.cart.orderLines = [];
        this.updateTotal();
        this.cart$.next(this.cart);
    }

    resetCart() {
        this.cart = this.initCart;
        this.setCart(this.initCart);
    }

    getCart(): Order {
        return this.cart;
    }

    // permet d'initialiser la liste d'articles dans articlePage
    initOrderLinesList(orderLines: OrderLine[]){
        this.orderLineList = orderLines;
        this.orderLineList$.next(orderLines);
    }

    updateOrderLineFromList(orderLine: OrderLine) {
        const index = this.orderLineList.indexOf(orderLine);
        this.orderLineList[index].quantity = 0;
        this.orderLineList$.next(this.orderLineList);
    }

    // mise à jour des quantités dans la liste des articles
    setOrderLineList(orderLinesFromCart: OrderLine[]) {
        orderLinesFromCart.forEach(orderLine => {
            let index = 0;
            let found = false;
            while (!found && index < this.orderLineList.length) {
                if (orderLine.article == this.orderLineList[index].article) {
                    this.orderLineList[index].quantity = orderLine.quantity;
                    found = true;
                }
                index++;
            }
        });
        this.orderLineList$.next(this.orderLineList);
    }

    // remise à 0 des quantités dans la liste d'article
    resetQuantityOfOrderLineList(){
        this.orderLineList.forEach(orderLine => orderLine.quantity = 0);
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
            this.cart.orderLines.forEach(value => this.total += (value.article.unitPrice * value.quantity));
        } else {
            this.cart.orderLines.forEach(value => this.total += ((value.article.unitPrice * value.quantity) * 0.95));
        }
    }

    setTotal(total: number) {
        this.total = total;
    }

    getTotal() {
        return this.total;
    }

    setFinalTotal(finalTotal: number) {
        this.finalTotal = finalTotal;
    }

    getFinalTotal() {
        return this.finalTotal;
    }
}
