import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import SwiperCore, { Pagination } from "swiper/core";
import { environment } from '../../environments/environment';
import { ReloadService } from '../core/services/reload.service';



SwiperCore.use([Pagination]);
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  itemData:any;
  itemArray: any;
  back:any = environment.api_url;

  constructor(private route: ActivatedRoute,
     private API: ApiService,
     public router: Router,
     public reload$: ReloadService) { 
    this.itemData = {
      description: "",
      discount: 0,
      images: [],
      item_id: "",
      name: "",
      price: 0,
      sizes: [],
      __v: 0,
      _id: "",
    }
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

}
