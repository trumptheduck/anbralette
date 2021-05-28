import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import SwiperCore, { Pagination } from "swiper/core";
import { environment } from '../../environments/environment';
import { ReloadService } from '../core/services/reload.service';
import { Item } from '../core/models/item.model';
import { CartService } from '../core/services/cart.service';
import { Order } from '../core/models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';



SwiperCore.use([Pagination]);
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  itemData: Item;
  itemArray: Item[];
  itemSize: string;
  sizeIndex:number;
  back:any = environment.api_url;

  constructor(private route: ActivatedRoute,
     private API: ApiService,
     public router: Router,
     public reload$: ReloadService,
     private cart$: CartService,
     private _snackBar: MatSnackBar) { 
      this.itemSize = "";
      this.sizeIndex = -1;
    this.itemData = {
      description: "",
      discount: 0,
      images: [""],
      item_id: "",
      name: "",
      price: 0,
      sizes: [""],
    }
    this.itemArray = [];
  }
  
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (params.id === undefined) {
          this.router.navigate(['home']);
        }
        this.API.get(`/apis/item/get/${params.id}`).subscribe((res)=>{
          console.log(res);
          this.itemData = res;
        })
        this.API.get("/apis/items").subscribe((res)=>{
          this.itemArray = res;
          console.log(res);
        })
      }
    );
  }
  addToCart():void {
    if (this.itemSize === "") {
      this._snackBar.open("Hãy chọn kích cỡ nàng nhé ❤","",{
        duration: 3000,
        panelClass: ['grey-snackbar']
      })
    } else {
      var order:Order = {
        size: this.itemSize,
        amount: 1,
        item: this.itemData
      }
      this.cart$.addToCartAndOpen(order);
    }
  }
  chooseSize(size:string,index:number):void {
    this.sizeIndex = index;
    this.itemSize = size;
  }
}
