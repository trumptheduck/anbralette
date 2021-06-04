import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Order } from '../core/models/order.model';
import { ApiService } from '../core/services/api.service';
import { ReloadService } from '../core/services/reload.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartData: Order[];
  back:string = environment.api_url;
  shippingFee: number = 0;
  formData: FormGroup;
  coupon: string;
  discount: number = 0;
  constructor( private _snackBar: MatSnackBar, private API: ApiService,public reload$ : ReloadService) { 
    this.cartData = JSON.parse(window.localStorage.getItem("cart-data"));
    this.formData = new FormGroup({
      name: new FormControl("", [Validators.required,]),
      phone: new FormControl("", [Validators.required,]),
      province: new FormControl("", [Validators.required,]),
      time: new FormControl("", [Validators.required,]),
      address: new FormControl("", [Validators.required,]),
      note: new FormControl(),
      coupon: new FormControl()
    })
  }

  ngOnInit(): void {
  }
  getCoupon() {
    this.API.post("/apis/coupon/get",{code: this.coupon}).subscribe((res)=>{
      if (res !== null) {
        this.discount = res.discount;
        this.formData.patchValue({coupon: this.coupon})
      } else {
        this.coupon = "";
        this._snackBar.open("Coupon không hợp lệ!","",{
          duration: 3000,
          panelClass: ['grey-snackbar']
        })
      }
    })
  }
  getTotalAmount():number {
    var total:number = 0;
    this.cartData.forEach(order=>{
      total += order.amount;
    })
    return total;
  }
  getTotalPrice():number {
    var total:number = 0;
    this.cartData.forEach(order=>{
      if (order.item.discount !== null) {
        total += order.item.discount*order.amount;
      } else {
        total += order.item.price*order.amount;
      }
    })
    return total;
  }
  onProvinceChange(event) {
    var province = event.target.options[event.target.selectedIndex].innerHTML;
    switch (province) {
      case "Quảng Ninh": 
      this.shippingFee = 24000;
      break;
      default: this.shippingFee = 33000;
    }
    this.formData.patchValue({province: province});
  }
  getDateTime() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime
  }
  checkout() {
    this.formData.patchValue({time: this.getDateTime()})
    if (this.formData.valid) {
      console.log(this.formData.value)
      console.log(this.cartData)
      var data = {
        name: this.formData.value.name,
        phone: this.formData.value.phone,
        province: this.formData.value.province,
        address: this.formData.value.address,
        note: this.formData.value.note,
        coupon: this.formData.value.coupon,
        payload: this.cartData,
        date: this.formData.value.time,
      }
      console.log(data);
      this.API.post("/apis/order",data).subscribe((res)=>{
        console.log(res)
        window.localStorage.removeItem("cart-data")
        this.reload$.goto("/invoice",{id: res._id})
      })
    } else {
      this._snackBar.open("Hãy điền đầy đủ thông tin đơn hàng!","",{
        duration: 3000,
        panelClass: ['grey-snackbar']
      })
      
    }
  }
}
