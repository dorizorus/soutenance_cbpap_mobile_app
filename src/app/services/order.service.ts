import { Injectable } from '@angular/core';
import {Commande} from "../models/Commande";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private commande:Commande;
  constructor() { }

  setCommande(commande:Commande){
    this.commande = commande;
  }

  getCommande():Commande{
    return this.commande;
  }
}
