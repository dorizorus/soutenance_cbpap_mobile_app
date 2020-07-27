import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-validation-com',
  templateUrl: './validation-com.page.html',
  styleUrls: ['./validation-com.page.scss'],
})
export class ValidationComPage implements OnInit {

  total:number;

  constructor(private orderService : OrderService) { }

  ngOnInit() {
    this.total = this.orderService.getTotal();
  }
}
