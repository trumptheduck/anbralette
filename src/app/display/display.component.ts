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
import { SEOService } from '../core/services/seo.service';



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
  swiperDir:boolean = true;
  back:any = environment.api_url;

  constructor(private route: ActivatedRoute,
     private API: ApiService,
     public router: Router,
     public reload$: ReloadService,
     private cart$: CartService,
     private _snackBar: MatSnackBar,
     private seo$: SEOService) { 
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
    if (window.innerWidth > 800) {
      this.swiperDir = false;
    }
    this.route.queryParams
      .subscribe(params => {
        if (params.id === undefined) {
          this.router.navigate(['home']);
        }
        this.API.get(`/apis/item/get/${params.id}`).subscribe((res)=>{
          this.itemData = res;
          this.seo$.updateTitle(`${this.itemData.name}-An Bralette`)
          this.seo$.updateDescription(this.itemData.description)
          this.seo$.updateOpenGraph({
            url: window.location.href,
            type: 'website',
            title: `${this.itemData.name}-An Bralette`,
            description: this.itemData.description,
            image: this.itemData.images[0]
          })
        })
        this.API.get("/apis/items").subscribe((res)=>{
          this.itemArray = res;
        })
      }
    );
  }
  addToCart():void {
    if (this.itemSize === "") {
      this._snackBar.open("H??y ch???n k??ch c??? n??ng nh?? ???","",{
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
