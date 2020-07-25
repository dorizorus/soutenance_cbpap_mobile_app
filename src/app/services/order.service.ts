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
    private total : number;
    private toggleStatus : boolean = false;
    public myData$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]);
    public toggle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    constructor() {
    }

    // transfère une commande (utilisé dans l'historique)
    setCommande(commande: Commande) {
        this.commande = commande;
    }

    getCommande(): Commande {
        return this.commande;
    }

    // transfère un panier ( utilisé dans article, panier et header)
    setPanier(panier: OrderLine[]) {
        this.panier = panier;
        this.myData$.next(this.panier);
    }

    getPanier(): OrderLine[] {
        return this.panier;
    }

    // transfère le montant total du panier (utilisé dans la modal ValidationCom)
    setTotalMontantPanier(total : number) {
        this.total = total;
    }

    getTotalMontantPanier() {
        return this.total;
    }

    // transfère l'état du toggle vis à vis du panier ou de la commande passé (utilisé dans header, panier)
    setStatus(status : boolean) {
        console.log("3 Entré dans setStatus, il vaut" + this.toggleStatus);
        this.toggleStatus = status;
        this.toggle$.next(this.toggleStatus);
        console.log("4 Sortie de set status, il vaut " + this.toggleStatus);
    }

    getStatus() {
        return this.toggleStatus;
    }
}
