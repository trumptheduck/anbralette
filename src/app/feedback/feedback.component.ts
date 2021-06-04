import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/services/api.service';
import { ReloadService } from '../core/services/reload.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  back: string = environment.api_url;
  feedbackArray: any;
  constructor(private API: ApiService,public reload$: ReloadService) {
    this.feedbackArray = [];
   }

  ngOnInit(): void {
    this.fetchFeedbacks()
  }
  fetchFeedbacks() {
    this.API.get("/apis/feedbacks").subscribe((res)=>{
      console.log(res);
      this.feedbackArray = res;
    })
  }

}
