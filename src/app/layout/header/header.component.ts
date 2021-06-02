import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order.model';
import { ApiService } from 'src/app/core/services/api.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ReloadService } from 'src/app/core/services/reload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  back:string = environment.api_url;
  isTopped: boolean = true;
  isDrawerOpened: boolean = false;
  isCartOpened: boolean = false;
  cartData: Order[];
  layout: any;
  constructor(public reload$: ReloadService, private cart$: CartService, private API :ApiService) { 
    this.cartData = [];
    this.layout = {
      homepage: [],
      all: [],
      weekly: ""
    }
    reload$.reloadObservable.subscribe(()=>{
      this.isDrawerOpened = false;
    })
  }
  ngOnInit(): void {
    this.cart$.cartObservable.subscribe((data)=>{
      this.cartData = data;
      console.log("cartCmp:",data)
      this.isCartOpened = true;
    })
    this.getLayout()
  }
  getLayout() {
    this.API.get("/apis/layout").subscribe((res)=>{
        this.layout = res;
    })
  }
  toggleDrawer():void {
    this.isDrawerOpened = !this.isDrawerOpened;
    if (!this.isDrawerOpened) {
      setTimeout(()=>{
        if (window.scrollY === 0) {
          this.isTopped = true;
        } else {
          this.isTopped = false
        }
      },250)
    } else {
      this.isTopped = false;
    }

  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
      if (window.scrollY === 0) {
        this.isTopped = true;
      } else {
        this.isTopped = false
      }
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
  removeFromCart(id:string,size:string):void {
    this.cart$.removeFromCart(id,size);
  }
}
