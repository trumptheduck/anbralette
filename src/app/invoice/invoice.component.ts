import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  orderData: any;
  back:string = environment.api_url
  constructor(private API: ApiService,private route: ActivatedRoute,public router: Router) { 
    this.orderData = {
      address: "",
      date: "",
      name: "",
      note: "",
      payload: [],
      phone: "",
      province: "",
      status: "",
      total: 0,
      payment: ""
    }
  }

  ngOnInit(): void {
    this.fetchOrder()
  }
  fetchOrder() {
    this.route.queryParams.subscribe(params => {
        if (params.id === undefined) {
          this.router.navigate(['home']);
        } else {
          this.API.post("/apis/order/get",{_id : params.id}).subscribe((res)=>{
            if (res === null) {
              this.router.navigate(['home']);
            } else {
              this.orderData = res
            }
          })
        }
      })
  }
  home() {
    this.router.navigate(['home']);
  }
}
