import {Component, OnInit} from '@angular/core';
import {Commande} from "../../models/Commande";
import {OrderService} from "../../services/order.service";

@Component({
    selector: 'app-historique',
    templateUrl: './historique.page.html',
    styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {

    public historique: Commande[];

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
        this.historique = this.initCommandes();
    }

    private initCommandes(): Commande[] {
        let commande1 = new Commande();
        let commande2 = new Commande();
        commande1 = {
            orderNumber: 'MOBI1337',
            date: new Date(2018,8,22),
            client: {
                id: 1,
                numeroTel: '101010',
                nom: 'test',
                adresse: 'somewhere',
                email : '',
                mdp : '',
                image : '',
                ville  :
                    {
                        id : 55,
                        nomVille : "Metz",
                        codePostal : 57000
                    }
            },
            orderLines: [
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
                }
            ]
        };
        commande2 = {
            orderNumber: 'mobydick',
            date: new Date(),
            client: {
                id: 2,
                numeroTel: '101010222',
                nom: 'test2',
                adresse: 'somewhere2',
                email : '',
                mdp : '',
                image : '',
                ville  :
                    {
                        id : 55,
                        nomVille : "Metz",
                        codePostal : 57000
                    }
            },
            orderLines: [
                {
                    orderNumber: 'commande2',
                    quantity: 10,
                    article: {
                        ref: 'test',
                        famille: 'emballage',
                        libelle: 'rouleau alu + boite distrib',
                        prixUnitaire: 15,
                        image : { id : 1 , document : ''},
                        description : { id : 1, contenu : ''}
                    }
                },
                {
                    orderNumber: 'commande2',
                    quantity: 12,
                    article: {
                        ref: 'GT35',
                        famille: 'verre',
                        libelle: 'gobelet',
                        prixUnitaire: 12.65,
                        image : { id : 1 , document : ''},
                        description : { id : 1, contenu : ''}
                    }
                }
            ]
        };
        return [commande1, commande2];
    }

    onLoadCommande(commande) {
        this.orderService.setCommande(commande);
    }
}
