import {Injectable} from '@angular/core';
import {OrderLine} from '../models/OrderLine';
import {BehaviorSubject} from 'rxjs';
import {WarehouseRetService} from './warehouse-ret.service';
import {HttpClient} from "@angular/common/http";
import {Order} from '../models/Order';
import {environment} from "../../environments/environment";
import {TopArticle} from "../models/TopArticle";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart: Order;
    private readonly initCart: Order;
    public cart$: BehaviorSubject<Order> = new BehaviorSubject<Order>(null);

    private orderLine: OrderLine;

    private orderLineList: OrderLine[] = [];
    public orderLineList$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]); // liste qui apparait sur la page article
    public orderLineBackup$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]);

    private WHRetrieval: boolean;
    private finalTotal: number;
    private total: number;

    // transfère le montant total du cart (utilisé dans la modal ValidationCom)
    constructor(private warehouseRet: WarehouseRetService, private http: HttpClient) {

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

    getCart(): Order {
        return this.cart;
    }

    setCart(cart: Order) {
        this.cart = cart;
        this.updateTotal();
        this.cart$.next(this.cart);
    }

    updateCartInfos(orderNumber: string, dateOrder: Date) {
        this.cart.orderNumber = orderNumber;
        this.cart.orderDate = dateOrder;
        this.cart$.next(this.cart);
    }

    // remet le panier à l'inital = vidage de panier
    resetCart() {
        this.cart = this.initCart;
        this.setCart(this.initCart);
    }


    // permet d'initialiser la liste d'articles dans articlePage
    initOrderLinesList(idCustomer: string) {
        this.http.get<TopArticle[]>(environment.topArticle + idCustomer).subscribe(data => {
                data.forEach(topArticle => {
                    const orderLine = {
                        article: topArticle.article,
                        quantity: 0
                    };
                    this.orderLineList.push(orderLine);
                })
                this.orderLineList$.next(this.orderLineList);
                this.orderLineBackup$.next(this.orderLineList);
            },
            error => console.log(error),
            () => {
                console.log('le top article du customer : ', this.orderLineList);
            }
        );
    }

    // mise à jour de la liste d'article avec la bonne quantité : prend une orderline en particulier
    updateOrderLineFromList(orderLine: OrderLine, qty: number) {
        const index = this.orderLineList.indexOf(orderLine);
        this.orderLineList[index].quantity = qty;
        this.orderLineList$.next(this.orderLineList);
    }

    // mise à jour des quantités dans la liste des articles : prend toutes les orderlines du panier en paramètre
    setOrderLineList(orderLinesFromCart: OrderLine[]) {
        if (orderLinesFromCart != [])
            orderLinesFromCart.forEach(orderLine => {
                let index = 0;
                let found = false;
                while (!found && index < this.orderLineList.length) {
                    if (orderLine.article.reference == this.orderLineList[index].article.reference) {
                        this.orderLineList[index].quantity = orderLine.quantity;
                        found = true;
                    }
                    index++;
                }
            });
        this.orderLineList$.next(this.orderLineList);
    }

    // remise à 0 des quantités dans la liste d'article
    resetQuantityOfOrderLineList() {
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
            this.cart.orderLines.forEach(value => this.total += (value.article.finalPrice * value.quantity));
        } else {
            this.cart.orderLines.forEach(value => this.total += ((value.article.finalPrice * value.quantity) * 0.95));
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

    filterOrderLineList(orderLinesFiltered: OrderLine[]) {
        this.orderLineList$.next(orderLinesFiltered);
    }
}
