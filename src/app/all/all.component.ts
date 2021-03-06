import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/services/api.service';
import { ReloadService } from '../core/services/reload.service';
import { SEOService } from '../core/services/seo.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  back: string = environment.api_url;
  itemArray:any;
  filteredItemArray:any;
  inputQuery:string = "";
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private API : ApiService,
    public reload$: ReloadService,
    private seo$: SEOService
  ) {
    this.itemArray = [];
    this.filteredItemArray = []
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
   this.fetchItemData()
  }
  safeToString(x) {
    switch (typeof x) {
      case 'object':
        return '*';
      case 'function':
        return '*';
      default:
        return x + '';
    }
  }
  fetchItemData():void {
    this.API.get("/apis/items").subscribe((res)=>{
      this.itemArray = res;
      this.route.queryParams
      .subscribe(params => {
        if (params.q !== undefined) {
          this.filterItem(params.q);
          this.inputQuery = params.q
        } else {
          this.filterItem("");
        }
      });
    })
  }
  onQueryChange() {
    this.filterItem(this.inputQuery);
  }
  filterItem(query) {
    if (query !== "") {
      this.filteredItemArray = this.itemArray.slice().filter(elem => {
        let result = false;
        var regex = new RegExp(query,"i")
          for (let key in elem) {
            if (this.safeToString(elem[key]).search(regex) !== -1) {
              if (key === "name"||key === "item_id") {
                result = true;
              }
            }
          }
          return result;
      });
    } else {
      this.filteredItemArray = this.itemArray.slice()
    }
  }
  calculateDiscount(price:number,discount:number):number {
    return Math.ceil(100-discount/price*100)
  }
}
