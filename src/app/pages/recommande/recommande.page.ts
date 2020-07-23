import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Commande} from "../../models/Commande";

@Component({
  selector: 'app-recommande',
  templateUrl: './recommande.page.html',
  styleUrls: ['./recommande.page.scss'],
})
export class RecommandePage implements OnInit {
  commande:Commande;
  total:number = 0;
  remise:boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.commande = this.orderService.getCommande();
    this.updateTotal();
  }

  toggled(){
    this.remise = !this.remise;
    this.updateTotal();
  }

  private updateTotal() {
    // Si le toggle est activé on applique la remise
    this.total = 0;
    if (!this.remise)
      this.commande.orderLines.forEach(value => this.total += (value.article.finalPrice * value.quantity));
    else
      this.commande.orderLines.forEach(value => this.total += ((value.article.finalPrice * value.quantity) * 0.95));
    if(this.total < 250 && !this.remise)
      this.total +=20;
  }

  // todo faire en sorte d'envoyer pdf par mail
  lancerCommande() {

  }

  updatePanier() {
    this.orderService.setPanier(this.commande.orderLines);
  }
}
