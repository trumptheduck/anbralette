import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackArray:any;
  imageArray:any;
  itemArray:any;
  selectedImage: string = "";
  selectedItem: any = null;
  isWindowOpened:boolean = false;
  couponName:string;
  couponDiscount:number;
  back:string = environment.api_url;
  constructor(private API: ApiService) { 
    this.feedbackArray = [];
    this.imageArray = [];
    this.itemArray = [];
  }

  ngOnInit(): void {
    this.fetchFeedbacks()
    this.fetchImageData()
    this.fetchItemData()
  }
  fetchFeedbacks() {
    this.API.get("/apis/feedbacks").subscribe((res)=>{
      console.log(res);
      this.feedbackArray = res;
    })
  }
  fetchImageData(): void {
    this.API.get("/apis/files").subscribe((res)=>{
      this.imageArray = res.files.reverse();
      console.log("img",res)
      var isExisted = this.imageArray.find(elem => elem === ".gitkeep");
      if (isExisted !== undefined) {
        this.imageArray.splice(this.imageArray.indexOf(isExisted),1) 
      }
    })
  }
  fetchItemData():void {
    this.API.get("/apis/items").subscribe((res)=>{
      this.itemArray = res;
      console.log(res)
    })
  }
  addFeedback() {
    if (this.selectedItem?._id !== undefined&&this.selectedImage !== "")
    this.API.post("/apis/feedback",{
      item: this.selectedItem._id,
      image: `/static/contents/${this.selectedImage}`
    }).subscribe((res)=>{
      console.log(res);
      this.fetchFeedbacks()
      this.isWindowOpened = false;
    })
  }
  removeFeedback(feedback) {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      this.API.post("/apis/feedback/delete",{_id: feedback._id}).subscribe((res)=>{
        console.log(res);
        this.fetchFeedbacks()
      })
    }
  }
  chooseImage(index) {
    this.selectedImage = this.imageArray[index];
  }
  chooseItem(item) {
    this.selectedItem = item;
  }
  openWindow() {
    this.selectedImage = "";
    this.selectedItem = null;
    this.isWindowOpened = true;
  }
}
