import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  isBannerVisible: boolean = true;
  isDiscountVisible: boolean = true;
  cartData:any;
  constructor(private cart$: CartService) { 
    this.cartData = JSON.parse(window.localStorage.getItem("cart-data"));
    this.cart$.cartObservable.subscribe((data)=>{
      this.cartData = data;
    })
  }
  
  openCart = this.cart$.openCart;
  ngOnInit(): void {
    
  }
  getTotalAmount():number {
    var total:number = 0;
    if (Array.isArray(this.cartData)) {
      this.cartData.forEach(order=>{
        total += order.amount;
      })
      return total;
    } else {return 0}
  }
}
