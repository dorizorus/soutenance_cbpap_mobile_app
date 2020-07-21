import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderLine } from 'src/app/models/OrderLine';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
// dans le cas d'un "can't bind" to ngFor", ajouter PanierPage à app.module.ts dans declarations & entryComponents
export class PanierPage implements OnInit {

    panier:OrderLine[];
    total: number;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
      // on subscribe aux données (ici un tableau de ligne de commande du panier), dès qu'un changement est detecté on les récupère
        this.orderService.myData.subscribe(data => {
            this.panier = data;
            }
        )
  }

    test() {
        console.log(this.panier)
    }
}
