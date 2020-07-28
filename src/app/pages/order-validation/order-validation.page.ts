import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import {TotalService} from "../../services/total.service";

@Component({
  selector: 'app-validation-com',
  templateUrl: './order-validation.page.html',
  styleUrls: ['./order-validation.page.scss'],
})
export class OrderValidationPage implements OnInit {

  total:number;

  constructor(private totalService : TotalService) { }

  ngOnInit() {
    this.total = this.totalService.getTotal();
  }
}
