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
  slidePerView: number = 2;
  back:any = environment.api_url;
  constructor(private API : ApiService) { 
    this.itemArray = [];
    this.API.get("/apis/items").subscribe((res)=>{
      this.itemArray = res;
      console.log(res);
    })
    this.API.get("/apis/categories").subscribe((res)=>{
      this.categoryArray = res;
      console.log(res);
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
