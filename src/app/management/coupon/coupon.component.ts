import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  couponArray:any;
  isWindowOpened:boolean = false;
  couponName:string;
  couponDiscount:number;
  constructor(private API: ApiService) { 
    this.couponArray = [];
  }

  ngOnInit(): void {
    this.fetchCoupons()
  }
  fetchCoupons() {
    this.API.get("/apis/coupons").subscribe((res)=>{
      console.log(res)
      this.couponArray = res;
    })
  }
  addCoupon() {
    this.API.post("/apis/coupon",{
      code: this.couponName,
      discount: this.couponDiscount
    }).subscribe((res)=>{
      console.log(res);
      this.fetchCoupons()
      this.isWindowOpened = false;
    })
  }
  removeCoupon(coupon) {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      this.API.post("/apis/coupon/delete",{_id: coupon._id}).subscribe((res)=>{
        console.log(res);
        this.fetchCoupons()
      })
    }
  }
}
