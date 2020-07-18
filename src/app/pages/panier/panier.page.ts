import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderLine } from 'src/app/models/OrderLine';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  panier : OrderLine[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.panier = this.orderService.getPanier();
  }

}
