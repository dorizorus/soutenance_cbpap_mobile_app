import {Injectable} from '@angular/core';
import {Commande} from "../models/Commande";
import {BehaviorSubject} from 'rxjs';
import {OrderLine} from '../models/OrderLine';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    // todo faire 2 services - 1 comande, 1 panier
    private commande: Commande;
    private panier: OrderLine[];
    public myData: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]);

    constructor() {
    }

    setCommande(commande: Commande) {
        this.commande = commande;
    }

    getCommande(): Commande {
        return this.commande;
    }

    setPanier(panier: OrderLine[]) {
        this.panier = panier;
        this.myData.next(this.panier);
    }

    getPanier(): OrderLine[] {
        return this.panier;
    }
}
