import { Component, OnInit } from '@angular/core';
import SwiperCore from 'swiper/core';
import { ApiService } from '../core/services/api.service';
import { environment } from '../../environments/environment';
import { Item } from '../core/models/item.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemArray: Item[];
  categoryArray:any[];
  layout: any;
  slidePerView: number = 2;
  back:any = environment.api_url;
  constructor(private API : ApiService) { 
    this.itemArray = [];
    this.layout = {
      homepage: [],
      all: [],
      weekly: ""
    }
    this.getLayout()
    
  }
  calculateDiscount(price:number,discount:number):number {
    return Math.ceil(100-discount/price*100)
  }
  upperCase(str:string):string {
    return str.toUpperCase()
  }
  getItemArray(category:any):any[] {
    var itemArray = [];
    if (category?.children?.length !== undefined) {
      category.children.forEach(child=> {
        if (Array.isArray(child.item)) {
          itemArray = itemArray.concat(child.item);
        }
      })
    }
    return itemArray.slice(0,20)
  }
  getLayout() {
    this.API.get("/apis/layout").subscribe((res)=>{
        this.layout = res;
    })
  }
  ngOnInit(): void {
    if (window.innerWidth < 500) {
      this.slidePerView = 2;
    } else {
      this.slidePerView = 5;
    }
  }
}
