import {Injectable} from '@angular/core';
import {Order} from "../models/Order";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {error} from "@angular/compiler/src/util";
import {BehaviorSubject} from "rxjs";
import {OrderLine} from "../models/OrderLine";
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private order: Order;
    private orders: Order[] = [];
    public ordersList$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

    constructor(private http: HttpClient, private userService: UserService) {
    }

    // transfère une order (utilise dans l'history)
    setOrder(order: Order) {
        this.order = order;
    }

    getOrder(): Order {

        return this.order;
    }

    getOrders(idCustomer : string): Order[] {
        this.http.get<Order[]>(environment.order + 'history/' + idCustomer).subscribe(ordersCustomer => {
            ordersCustomer.forEach(element => {
                const orderHistory = {
                    orderNumber: element.orderNumber,
                    orderDate: element.orderDate,
                    customer: this.userService.getActiveCustomer(),
                    orderLines: element.orderLines
                };
                this.orders.push(orderHistory);
            })
        },
        error => console.log(error),
        () => this.ordersList$.next(this.orders)
        );
        return this.orders;
    }

    setOrders(orders: Order[]) {
        this.orders = orders;
    }

    addOrder(order) {
        this.orders.push(order);
        this.ordersList$.next(this.orders);
    }

    editOrder(order) {
        const objIndex = this.orders.findIndex((obj => obj.orderNumber == order.orderNumber));
        this.orders[objIndex] = order;
    }
}

