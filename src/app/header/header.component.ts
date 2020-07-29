import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {CartPage} from '../pages/cart/cart.page';
import {OrderLine} from "../models/OrderLine";
import {UserService} from '../services/user.service';
import {Customer} from '../models/Customer';
import {WarehouseRetService} from "../services/warehouse-ret.service";
import {CartService} from "../services/cart.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    panier: OrderLine[];
    total: number = 0;
    remise = false;
    customer : Customer;

    constructor(private modalController: ModalController,
                private navCtrl: NavController,
                private cartSerivce:CartService,
                private userService: UserService,
                private warehouseRetService:WarehouseRetService,

    ) {}

    ngOnInit() {
        // on subscribe à toute nouvelles données du cart
        this.cartSerivce.cart$.subscribe((data) => {
            this.panier = data;
            this.updateTotal();
        });
        // on subscribe à tout nouveau changement du status du toogle
        this.warehouseRetService.toggle$.subscribe((status) => {
            this.remise = status;
        });
        
        // on subscribe à tout nouveau changement du customer actif
        this.userService.activeCustomer$.subscribe((data) => {
            this.customer = data;
        })
    }

    // met a jour le prix total de la commande, base sur la liste des articles dans le cart
    private updateTotal() {
        // Si le toggle est activé on applique la remise
        this.total = 0;
        if (!this.remise)
            this.panier.forEach(value => this.total += (value.article.unitPrice * value.quantity));
        else
            this.panier.forEach(value => this.total += ((value.article.unitPrice * value.quantity) * 0.95));
    }

    // cree une modale qui represente le cart
    async createPanier() {
        const modal = await this.modalController.create({
            component: CartPage,
            cssClass: 'modal-article',
            backdropDismiss: true
        });
        return await modal.present();
    }

    // permet d'avancer vers une route selectionné. L'avantage c'est que cela créer une animation
    // adéquate (fondu "avant" ou "arrière" d'un back button). Une des nombreuses manière de naviguer
    async goToSettings() {
        this.navCtrl.navigateForward('acc-choice');
    }

    // probleme de synchronisation au depart
    // solution ci-dessous, permet de fix le ion-toggle, erreur de synchro entre cart & header
    // https://medium.com/@aleksandarmitrev/ionic-toggle-asynchronous-change-challenge-7e7cbdd50cb7
    toggle($event: any) {
        if (!this.remise) {
            $event.stopImmediatePropagation();
            $event.stopPropagation();
            $event.preventDefault();
            this.warehouseRetService.setStatus(!this.remise)
        } else {
            setTimeout(() => { this.remise= false; });
        }
    }
}
