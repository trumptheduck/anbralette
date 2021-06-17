import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/services/api.service';
import { ReloadService } from '../core/services/reload.service';
import { SEOService } from '../core/services/seo.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  back: string = environment.api_url;
  categoryArray:any[];
  selectedCat:any;
  selectedSubcat:any;
  isAll:boolean;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private API : ApiService,
    public reload$: ReloadService,
    private seo$: SEOService
  ) {
    this.categoryArray = [];
    this.selectedCat = {
      name: "",
      _id: "",
      children: []
    }
    this.selectedSubcat = {
      name: "",
      _id: "",
      item: []
    }
   }

  ngOnInit(): void {
    this.getAllCategory(()=>{
      this.route.queryParams
      .subscribe(params => {
        if (params.category === undefined) {
          this.router.navigate(['home']);
        }
        if (params.subcategory === undefined) {
          this.isAll = true;
        } else {
          this.isAll = false;
        }
        if (this.isAll) {
          this.selectedCat = this.categoryArray.find(cat=>cat._id === params.category)
          this.seo$.updateTitle(this.selectedCat.name + " - An Bralette - Đồ lót Design - Nội y cao cấp")
          this.seo$.updateDescription("AN bralette là thương hiệu đồ ngủ, đồ nội y thiết kế được may bởi chính những người Phụ Nữ Việt Nam. Các sản phẩm được chúng tôi thiết kế dựa trên nguồn cảm hứng or theo yêu cầu riêng của khách hàng, chọn lựa chất liệu ren form dáng phù hợp với cơ thể người Việt. Tất cả các mẫu thiết kế đều độc quyền và có số lượng giới hạn.  ")
          this.seo$.updateOpenGraph({
            url: window.location.href,
            type: 'website',
            title: this.selectedCat.name + " - An Bralette - Đồ lót Design - Nội y cao cấp",
            description: "AN bralette là thương hiệu đồ ngủ, đồ nội y thiết kế được may bởi chính những người Phụ Nữ Việt Nam. Các sản phẩm được chúng tôi thiết kế dựa trên nguồn cảm hứng or theo yêu cầu riêng của khách hàng, chọn lựa chất liệu ren form dáng phù hợp với cơ thể người Việt. Tất cả các mẫu thiết kế đều độc quyền và có số lượng giới hạn.  ",
            image: "../../assets/images/brand.jpeg"
          })
        } else {
          this.selectedCat = this.categoryArray.find(cat=>cat._id === params.category)
          this.selectedSubcat = this.selectedCat.children.find(subcat=>subcat._id === params.subcategory)
          this.seo$.updateTitle(this.selectedSubcat.name + " - An Bralette - Đồ lót Design - Nội y cao cấp")
          this.seo$.updateDescription("AN bralette là thương hiệu đồ ngủ, đồ nội y thiết kế được may bởi chính những người Phụ Nữ Việt Nam. Các sản phẩm được chúng tôi thiết kế dựa trên nguồn cảm hứng or theo yêu cầu riêng của khách hàng, chọn lựa chất liệu ren form dáng phù hợp với cơ thể người Việt. Tất cả các mẫu thiết kế đều độc quyền và có số lượng giới hạn.  ")
          this.seo$.updateOpenGraph({
            url: window.location.href,
            type: 'website',
            title: this.selectedSubcat.name + " - An Bralette - Đồ lót Design - Nội y cao cấp",
            description: "AN bralette là thương hiệu đồ ngủ, đồ nội y thiết kế được may bởi chính những người Phụ Nữ Việt Nam. Các sản phẩm được chúng tôi thiết kế dựa trên nguồn cảm hứng or theo yêu cầu riêng của khách hàng, chọn lựa chất liệu ren form dáng phù hợp với cơ thể người Việt. Tất cả các mẫu thiết kế đều độc quyền và có số lượng giới hạn.  ",
            image: "../../assets/images/brand.jpeg"
          })
        }
      }
    );
    })
  }
  getAllCategory(callback) {
    this.API.get("/apis/categories").subscribe((res)=>{
      this.categoryArray = res;
      callback()
    })
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
    return itemArray
  }
  calculateDiscount(price:number,discount:number):number {
    return Math.ceil(100-discount/price*100)
  }
}
