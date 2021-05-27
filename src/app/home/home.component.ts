import { Component, OnInit } from '@angular/core';
import SwiperCore from 'swiper/core';
import { ApiService } from '../core/services/api.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemArray: any;
  back:any = environment.api_url;
  constructor(private API : ApiService) { 

  }

  ngOnInit(): void {
    this.API.get("/apis/items").subscribe((res)=>{
      this.itemArray = res;
      console.log(res);
    })
  }
}
