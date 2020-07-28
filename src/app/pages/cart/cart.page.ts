import {Component, OnInit} from '@angular/core';
import {OrderService} from 'src/app/services/order.service';
import {OrderLine} from 'src/app/models/OrderLine';
import {ModalController} from "@ionic/angular";
import {OrderValidationPage} from "../order-validation/order-validation.page";
import {ChangeDetectorRef} from '@angular/core';
import {WarehouseRetService} from "../../services/warehouse-ret.service";
import {TotalService} from "../../services/total.service";
import {CartService} from "../../services/cart.service";


@Component({
    selector: 'app-panier',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
// dans le cas d'un "can't bind" to ngFor", ajouter CartPage à app.module.ts dans declarations & entryComponents
export class CartPage implements OnInit {

    possibleQuantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    cart: OrderLine[];
    total: number;
    warehouseRetrieval: boolean;

    constructor(private orderService: OrderService,
                private modalController: ModalController,
                private warehouseRetService: WarehouseRetService,
                private totalService: TotalService,
                private cartService: CartService) {
    }

    ngOnInit() {
        this.warehouseRetrieval = this.warehouseRetService.getStatus();
        // on subscribe aux données (ici un tableau de ligne de commande du cart), dès qu'un changement est detecté on les récupère
        this.cartService.cart$.subscribe(data => {
                this.cart = data;
            }
        )

        this.warehouseRetService.toggle$.subscribe((status) => {
            this.warehouseRetrieval = status;
        })
        this.updateTotal();
    }

    // ferme modal
    onDismiss() {
        this.modalController.dismiss();
    }

    deleteLine(orderLine: OrderLine) {
        this.cart.splice(this.cart.indexOf(orderLine), 1);
        this.cartService.setCart(this.cart);
    }

    deleteAll() {
        this.cartService.setCart([]);
        this.onDismiss();
    }

    // toggle le warehouseRetrieval on-off
    toggled() {
        this.warehouseRetService.setStatus(!this.warehouseRetService.getStatus());
        this.updateTotal();
    }

    // met a jour le total du cart en fonction des articles & de leur quantite & du discount, selon leur finalPrice
    private updateTotal(): number {
        // Si le toggle est activé on applique la remise
        this.total = 0;
        if (!this.warehouseRetrieval)
            this.cart.forEach(value => this.total += (value.article.finalPrice * value.quantity));
        else
            this.cart.forEach(value => this.total += ((value.article.finalPrice * value.quantity) * 0.95));
        return this.total;
    }

    async createValidationOrder() {
        this.totalService.setTotal(this.total);
        this.modalController.dismiss();
        const modal = await this.modalController.create({
            component: OrderValidationPage,
            cssClass: 'modal-pop',
            backdropDismiss: true
        });
        return await modal.present();
    }

    updateCart($event: any, ligne: OrderLine) {
        // pour chaque orderLine du cart,
        // on cherche la correspondance avec la ligne modifiée
        this.cart.forEach(
            (orderLine) => {
                if (ligne.article.reference === orderLine.article.reference) {

                    // une fois celle-ci trouvée, on met à jour la ligne avec la nouvelle quantité
                    ligne.quantity = $event.target.value;

                    // on cherche l'index de l'orderLine qu'on va mettre à jour
                    const index = this.cart.indexOf(orderLine);

                    // on met à jour la ligne dans le cart
                    this.cart[index] = ligne;
                }
            }
        );

        // on met à jour le cart dans le service
        this.cartService.setCart(this.cart);
        this.updateTotal();
    }
}
