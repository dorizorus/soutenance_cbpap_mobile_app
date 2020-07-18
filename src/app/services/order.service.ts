import { Injectable } from '@angular/core';
import {Commande} from "../models/Commande";
import { Observable } from 'rxjs';
import { OrderLine } from '../models/OrderLine';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private quantityTotal : number;
  private commande:Commande;
  private panier: OrderLine[];

  constructor() { }

  // créer un observable qui est censé l'envoyer à un subscribe
  readonly quantityObservable = new Observable(
    (observer) => {

      let totalQ : number;

      (quantite : number) => {
        totalQ = this.quantityTotal;
        observer.next(quantite);
    }
  });

  // on set la quantité que l'on récupère au dessus
  setTotalQuantity( quantity : number) {
    this.quantityTotal = quantity;
    console.log("Attribution de la quantité de " + this.quantityTotal + " dans le service");
  }

  setCommande(commande:Commande){
    this.commande = commande;
  }

  getCommande():Commande{
    return this.commande;
  }

  getPanier() {
    return this.panier;
  }

  setPanier( orderLines : OrderLine[]) {
    this.panier = orderLines;
  }

}
