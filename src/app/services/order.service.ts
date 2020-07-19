import { Injectable } from '@angular/core';
import {Commande} from "../models/Commande";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { OrderLine } from '../models/OrderLine';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private quantityTotal : number = 0;
  private commande:Commande;
  private panier: OrderLine[];
  public myData: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }
  
  /*
  // créer un observable qui est censé l'envoyer à un subscribe
  readonly quantityObservable = new Observable<number>(
    (observer) => {
      (quantite : number) => {
        quantite = this.quantityTotal;
        observer.next(quantite);
    }
  }); 
  */

  // tentative via behaviour subject
  loadQuantite() {
    this.myData.next(this.quantityTotal);
  }


  // on set la quantité que l'on récupère au dessus
  setTotalQuantity( quantity : number) {
    this.quantityTotal = quantity;
    this.myData.next(this.quantityTotal);
    console.log("Attribution de la quantité de " + this.quantityTotal + " dans le service");
  }

  getTotalQuantity() {
    return this.quantityTotal;
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
