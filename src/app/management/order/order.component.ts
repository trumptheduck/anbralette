import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ReloadService } from 'src/app/core/services/reload.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderArray: any;
  constructor(private API: ApiService,public reload$: ReloadService) { 
    this.orderArray = [];
  }

  ngOnInit(): void {
    this.fetchOrder()
  }
  fetchOrder() {
    this.API.get("/apis/orders").subscribe((res)=>{
      console.log(res)
      this.orderArray = res;
    })
  }
  getColor(string:string) {
    var color = ''
    switch (string) {
      case "Chưa kiểm duyệt":
        color = "yellow"
        break;
        case "Đã xác nhận":
            color = "blue"
        break;
        case "Đang giao hàng":
            color = "purple"
        break;
        case "Hoàn thành":
            color = "green"
        break;
        case "Hủy bỏ":
            color = "grey"
        break;
        case "Chưa thanh toán":
            color = "red"
        break;
        default: color = "";
    }
    return color;
  }
  changeOrderStatus(event,order) {
    var status = event.target.options[event.target.selectedIndex].innerHTML;
    this.API.patch("/apis/order",{_id: order._id, status: status}).subscribe((res)=>{
      this.fetchOrder();
      console.log(res)
    })
  }
  deleteOrder(order) {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      this.API.post("/apis/order/delete",{_id: order._id}).subscribe((res)=>{
        this.fetchOrder();
        console.log(res)
      })
    }
  }
}
