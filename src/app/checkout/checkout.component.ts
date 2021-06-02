import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../core/models/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartData: Order[];
  back:string = environment.api_url;
  constructor() { 
    this.cartData = JSON.parse(window.localStorage.getItem("cart-data"));
  }

  ngOnInit(): void {
  }
  getTotalAmount():number {
    var total:number = 0;
    this.cartData.forEach(order=>{
      total += order.amount;
    })
    return total;
  }
  getTotalPrice():number {
    var total:number = 0;
    this.cartData.forEach(order=>{
      if (order.item.discount !== null) {
        total += order.item.discount*order.amount;
      } else {
        total += order.item.price*order.amount;
      }
    })
    return total;
  }
}
