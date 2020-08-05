import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ArticleService} from '../../services/article.service';
import {CartService} from '../../services/cart.service';
import {OrderLine} from '../../models/OrderLine';


@Component({
    selector: 'app-single-article',
    templateUrl: './single-article.page.html',
    styleUrls: ['./single-article.page.scss'],
})
export class SingleArticlePage implements OnInit {

    @Input() orderLine: OrderLine;
    possibleQuantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    isEmpty: boolean;

    constructor(private articleNav: ArticleService,
                private cartNav: CartService,
                private modalController: ModalController,
                private router: Router) {
    }

    ngOnInit() {
        // pour eviter d'entrer par l'url - pas forcement utile
        this.modalController.dismiss(this).catch((error) => this.router.navigateByUrl('/nav'));
    }


    onDismiss() {
        this.modalController.dismiss(this);
    }

    // au clic du bouton réinitialiser, met la quantité de l'article sélectionnée à 0
    onReset(orderLine: OrderLine) {
        orderLine.quantity = 0;
        this.onDismiss();
    }

    onChange($event: any, orderLine: OrderLine) {
        orderLine.quantity = $event.target.value;
    }
}
