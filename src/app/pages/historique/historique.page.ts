import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {

  public historique = [
    { name:'Commande 1',
      produits:[
        {
          name:'produit1'
        },
        {
          name:'produit2'
        },
        {
          name:'produit3'
        }
      ],
      total:123
    },
    { name:'Commande 2',
      produits:[
        {
          name:'produit1'
        },
        {
          name:'produit2'
        }
      ],
      total:10

    },
    { name:'Commande 3',
      produits:[
        {
          name:'produit1'
        }
      ],
      total:456
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  onLoadCommande(commande) {
    console.log(commande)
  }
}
