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
  constructor(private cart$: CartService) { }
  openCart = this.cart$.openCart;
  ngOnInit(): void {
    
  }

}
