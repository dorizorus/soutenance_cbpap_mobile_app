import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from 'src/app/services/order.service';
import {OrderLine} from 'src/app/models/OrderLine';
import {ModalController} from '@ionic/angular';
import {OrderValidationPage} from '../order-validation/order-validation.page';
import {WarehouseRetService} from '../../services/warehouse-ret.service';
import {CartService} from '../../services/cart.service';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-panier',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
// dans le cas d'un "can't bind" to ngFor", ajouter CartPage à app.module.ts dans declarations & entryComponents
export class CartPage implements OnInit, OnDestroy {

    possibleQuantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    cart: OrderLine[];
    total: number;
    warehouseRetrieval: boolean;
    subscriptionToCart: Subscription;
    subscriptionToWHRetrieval: Subscription;
    orderLineList: OrderLine[];
    shippingPrice : number = 20;

    constructor(private orderService: OrderService,
                private modalController: ModalController,
                private warehouseRetService: WarehouseRetService,
                private cartService: CartService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        // this.warehouseRetrieval = this.warehouseRetService.getStatus(); -> redondant comme on a la subscription

        // on subscribe aux données (ici un tableau de ligne de commande du cart), dès qu'un changement est detecté on les récupère
        this.subscriptionToCart = this.cartService.cart$.subscribe(data => {
                this.cart = data;
                this.total = this.cartService.getTotal();
            }
        );

        this.subscriptionToWHRetrieval = this.warehouseRetService.toggle$.subscribe((status) => {
            this.warehouseRetrieval = status;
            this.total = this.cartService.getTotal();
        });

        this.orderLineList = this.cartService.getOrderLineList();
    }

    // pour fermer la modal de manière explicite par un bouton
    // sinon si on clique à côté de la modal ça appel modalController.dismiss() tout seul
    onDismiss() {
        this.modalController.dismiss();
    }

    // appelé quand la modal est fermée par modelController.dismiss()
    // on supprime les souscriptions aux observables
    ngOnDestroy() {
        this.subscriptionToCart.unsubscribe();
        this.subscriptionToWHRetrieval.unsubscribe();
    }

    deleteLine(orderLine: OrderLine) {
        const index = this.findOrderLineIndex(orderLine);
        if (index !== -1) {
            this.orderLineList[index].quantity = 0;
            setTimeout(() => {
                this.cartService.setOrderLineList(this.orderLineList);
            });
        }
        this.cart.splice(this.cart.indexOf(orderLine), 1);
        this.cartService.setCart(this.cart);
        if (this.cart.length === 0) {
            this.onDismiss();
        }
    }

    deleteAll() {
        this.cart.forEach(
            (orderLine) => {
                const index = this.findOrderLineIndex(orderLine);
                if (index !== -1) {
                    this.orderLineList[index].quantity = 0;
                }
            }
        );
        this.cartService.setOrderLineList(this.orderLineList);
        this.cartService.setCart([]);
        this.onDismiss();
    }

    findOrderLineIndex(orderLine: OrderLine) {
        let found = false;
        let index = 0;
        while (!found && index < this.orderLineList.length) {
            if (this.orderLineList[index] === orderLine) {
                found = true;
            } else {
                index++;
            }
        }
        if (found) {
            return index;
        }
        return -1;
    }

    // toggle le warehouseRetrieval on-off
    toggled() {
        this.warehouseRetService.setStatus(!this.warehouseRetService.getStatus());
    }

    async createValidationOrder() {
        this.modalController.dismiss();
        const modal = await this.modalController.create({
            component: OrderValidationPage,
            cssClass: 'modal-pop',
            backdropDismiss: true
        });
        return await modal.present();
    }

    updateCart($event: any, line: OrderLine) {
        line.quantity = $event.target.value;
        // on met à jour le cart dans le service
        this.cartService.setCart(this.cart);
    }
}
