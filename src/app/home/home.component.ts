import { Component, OnInit } from '@angular/core';
import SwiperCore from 'swiper/core';
import { ApiService } from '../core/services/api.service';
import { environment } from '../../environments/environment';
import { Item } from '../core/models/item.model';
import { Title } from '@angular/platform-browser';
import { SEOService } from '../core/services/seo.service';


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
  constructor(private API : ApiService, private seo$: SEOService ) { 
    this.itemArray = [];
    this.layout = {
      homepage: [],
      all: [],
      weekly: ""
    } 
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
    this.seo$.updateTitle("An Bralette - Đồ lót Design - Nội y cao cấp")
    this.seo$.updateDescription("AN bralette là thương hiệu đồ ngủ, đồ nội y thiết kế được may bởi chính những người Phụ Nữ Việt Nam. Các sản phẩm được chúng tôi thiết kế dựa trên nguồn cảm hứng or theo yêu cầu riêng của khách hàng, chọn lựa chất liệu ren form dáng phù hợp với cơ thể người Việt. Tất cả các mẫu thiết kế đều độc quyền và có số lượng giới hạn.  ")
    this.seo$.updateOpenGraph({
      url: window.location.href,
      type: 'website',
      title: "An Bralette - Đồ lót Design - Nội y cao cấp",
      description: "AN bralette là thương hiệu đồ ngủ, đồ nội y thiết kế được may bởi chính những người Phụ Nữ Việt Nam. Các sản phẩm được chúng tôi thiết kế dựa trên nguồn cảm hứng or theo yêu cầu riêng của khách hàng, chọn lựa chất liệu ren form dáng phù hợp với cơ thể người Việt. Tất cả các mẫu thiết kế đều độc quyền và có số lượng giới hạn.  ",
      image: "../../assets/images/brand.jpeg"
    })
    if (window.innerWidth < 500) {
      this.slidePerView = 2;
    } else {
      this.slidePerView = 5;
    }
    this.getLayout()
  }
}
