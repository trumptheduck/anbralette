import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartSubject: Subject<Order[]>;
  cartObservable: Observable<Order[]>;
  openCart:() => void;
  addToCartAndOpen: (order:Order)=>void;
  constructor() { 
    this.cartSubject = new Subject<Order[]>();
    this.cartObservable = this.cartSubject.asObservable();
    this.openCart = ():void => {
      var localCart = window.localStorage.getItem("cart-data");
      var data: Order[];
      if (localCart === null) {
        data = [];
      } else {
        data = JSON.parse(localCart);
      }
      console.log(data);
      this.cartSubject.next(data);
    }
    this.addToCartAndOpen = (order:Order):void => {
      var localCart = window.localStorage.getItem("cart-data");
      var data: Order[];
      if (localCart === null) {
        data = [order];
      } else {
        console.log()
        var array = JSON.parse(localCart)
        var duplicatedOrders = array.filter((elem:Order) => elem.item.item_id === order.item.item_id)
        if (duplicatedOrders.length > 0) {
          var isDuplicated:boolean = false;
          duplicatedOrders.forEach((elem:Order) => {
             if (elem.size === order.size) {
                elem.amount += order.amount;
                isDuplicated = true;
             } 
          })
          if (!isDuplicated) {
          array.push(order)
          }
        } else {
          array.push(order)
        }
        data = array;
      }
      console.log(data);
      window.localStorage.setItem("cart-data",JSON.stringify(data));
      this.cartSubject.next(data);
    }
  }
  removeFromCart(id:string,size:string):void {
    var localCart = window.localStorage.getItem("cart-data");
    if (localCart !== null) {
      var array:Order[] = JSON.parse(localCart)
      var selectedOrder = array.filter((elem:Order)=>elem.item.item_id === id)
      if (selectedOrder.length > 0) {
        selectedOrder.forEach(elem =>{
          if (elem.size === size) {
            array.splice(array.indexOf(elem),1)
          }
        })
      }
      window.localStorage.setItem("cart-data",JSON.stringify(array));
      this.cartSubject.next(array);
    }
  }
}
