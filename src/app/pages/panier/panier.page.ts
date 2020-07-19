import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderLine } from 'src/app/models/OrderLine';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {



  constructor(private orderService: OrderService) { }

  ngOnInit() {

  }

  panier = [
    {
        orderNumber: 'commande1',
        quantity: 10,
        article: {
            ref: 'AL30',
            famille: 'emballage',
            libelle: 'rouleau alu + boite distrib',
            prixUnitaire: 10,
            image : { id : 1 , document : ''},
            description : { id : 1, contenu : ''}
        }
    },
    {
        orderNumber: 'commande1',
        quantity: 12,
        article: {
            ref: 'DP113',
            famille: 'decoration',
            libelle: 'lapin coquin',
            prixUnitaire: 60,
            image : { id : 1 , document : ''},
            description : { id : 1, contenu : ''}
        }
    },
    {
      orderNumber: 'commande1',
      quantity: 7,
      article: {
          ref: '44888PP',
          famille: 'decoration',
          libelle: 'cache cache',
          prixUnitaire: 40,
          image : { id : 1 , document : ''},
          description : { id : 1, contenu : ''}
      }
  }
];

}
