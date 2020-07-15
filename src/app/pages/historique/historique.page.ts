import {Component, OnInit} from '@angular/core';
import {Commande} from "../../models/Commande";
import {Client} from "../../models/Client";

@Component({
    selector: 'app-historique',
    templateUrl: './historique.page.html',
    styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {

    public historique: Commande[];
    private commande1: Commande;
    private commande2: Commande;

    constructor() {
    }

    ngOnInit() {
        this.historique = this.initCommandes();
    }

    private initCommandes():Commande[] {
        this.commande1 = new Commande();
        this.commande2 = new Commande();
        this.commande1 = {
            id: 1,
            client: {id:1,
            numeroTel:'101010',
            nom:'test',
            adresse:'somewhere'},
          orderLines: [
            {
              orderNumber:'commande1',
              quantity:10,
              article: {
                ref:'AL30',
                famille:'emballage',
                libelle:'rouleau alu + boite distrib',
                prixUnitaire:10
              }
            },
            {
              orderNumber:'commande1',
              quantity:12,
              article: {
                ref:'DP113',
                famille:'decoration',
                libelle:'lapin coquin',
                prixUnitaire:60
              }
            }
          ]
        };
      this.commande2 = {
        id: 2,
        client: {id:2,
          numeroTel:'101010222',
          nom:'test2',
          adresse:'somewhere2'},
        orderLines: [
          {
            orderNumber:'commande2',
            quantity:10,
            article: {
              ref:'test',
              famille:'emballage',
              libelle:'rouleau alu + boite distrib',
              prixUnitaire:15
            }
          },
          {
            orderNumber:'commande2',
            quantity:12,
            article: {
              ref:'GT35',
              famille:'verre',
              libelle:'gobelet',
              prixUnitaire:12.65
            }
          }
        ]
      };
        this.historique.push(this.commande1);
        this.historique.push(this.commande2);

        return this.historique;
    }

    onLoadCommande(commande) {
        console.log(commande)
    }
}
