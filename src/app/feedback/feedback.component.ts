import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/services/api.service';
import { ReloadService } from '../core/services/reload.service';
import { SEOService } from '../core/services/seo.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  back: string = environment.api_url;
  feedbackArray: any;
  constructor(private API: ApiService,public reload$: ReloadService, private seo$: SEOService) {
    this.feedbackArray = [];
   }

  ngOnInit(): void {
    this.seo$.updateTitle("FEEDBACKS - An Bralette - Đồ lót Design - Nội y cao cấp")
    this.seo$.updateDescription("AN bralette là thương hiệu đồ ngủ, đồ nội y thiết kế được may bởi chính những người Phụ Nữ Việt Nam. Các sản phẩm được chúng tôi thiết kế dựa trên nguồn cảm hứng or theo yêu cầu riêng của khách hàng, chọn lựa chất liệu ren form dáng phù hợp với cơ thể người Việt. Tất cả các mẫu thiết kế đều độc quyền và có số lượng giới hạn.  ")
    this.seo$.updateOpenGraph({
      url: window.location.href,
      type: 'website',
      title: "FEEDBACKS - An Bralette - Đồ lót Design - Nội y cao cấp",
      description: "AN bralette là thương hiệu đồ ngủ, đồ nội y thiết kế được may bởi chính những người Phụ Nữ Việt Nam. Các sản phẩm được chúng tôi thiết kế dựa trên nguồn cảm hứng or theo yêu cầu riêng của khách hàng, chọn lựa chất liệu ren form dáng phù hợp với cơ thể người Việt. Tất cả các mẫu thiết kế đều độc quyền và có số lượng giới hạn.  ",
      image: "../../assets/images/brand.jpeg"
    })
    this.fetchFeedbacks()
  }
  fetchFeedbacks() {
    this.API.get("/apis/feedbacks").subscribe((res)=>{
      this.feedbackArray = res;
    })
  }

}
