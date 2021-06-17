import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  layout:any;
  tempLayout: any;
  categoryArray:any;
  selectedData: any;
  dataLink: any;
  isWindowOpened: boolean= false;
  isSaved:boolean = true;
  constructor(private API :ApiService) { 
    this.layout = {
      homepage: [],
      all: [],
      flashsale: "",
      weekly: ""
    }
    this.tempLayout = {
      homepage: [],
      all: [],
      flashsale: "",
      weekly: ""
    }
    
  }
  openWindow(selectedData) {
    this.selectedData = selectedData;
    this.isWindowOpened = true;
  }

  ngOnInit(): void {
    this.getLayout();
    this.fetchCategoryData();
  }
  getLayout() {
    this.API.get("/apis/layout").subscribe((res)=>{
        this.layout = res;
        console.log(res)
        this.tempLayout = JSON.parse(JSON.stringify(this.layout));
    })
  }
  fetchCategoryData (): void {
    this.API.get("/apis/categories").subscribe((res)=>{
      console.log(res);
      this.categoryArray = res;
    })
  }
  swapArrayElements(a, x, y) {
    if (a.length === 1) return a;
    a.splice(y, 1, a.splice(x, 1, a[y])[0]);
    return a;
  };
  
  moveCategoryUp(category) {
    this.isSaved = false;
    var selfIndex = this.selectedData.indexOf(category)
    var targetIndex = selfIndex - 1;
    if (targetIndex >= 0) {
      this.swapArrayElements(this.selectedData,selfIndex,targetIndex);
    }
  }
  moveCategoryDown(category) {
    this.isSaved = false;
    var selfIndex = this.selectedData.indexOf(category)
    var targetIndex = selfIndex + 1;
    if (targetIndex < this.selectedData.length) {
      this.swapArrayElements(this.selectedData,selfIndex,targetIndex);
    }
  }
  removeCategory(category) {
    this.isSaved = false;
    this.selectedData.splice(this.selectedData.indexOf(category),1)
  }
  addCategory(category) {
    this.isSaved = false;
    this.selectedData.push(category)
  }
  onOptionChange(event) {
    this.isSaved = false;
    this.tempLayout.weekly = event.target.options[event.target.selectedIndex].value;
    console.log(event.target.options[event.target.selectedIndex].value)
  }
  save() {
    if (typeof(this.tempLayout.weekly) !== "string") {
      this.tempLayout.weekly = this.tempLayout.weekly?._id;
    }
    var homepageArr = [];
    this.tempLayout.homepage.forEach(data => {
      homepageArr.push(data._id)
    })
    var allArr = [];
    this.tempLayout.all.forEach(data => {
      allArr.push(data._id)
    })
    console.log(
      {
        homepage: homepageArr,
        all: allArr,
        weekly: this.tempLayout.weekly
      }
    )
     this.API.patch("/apis/layout",{
        homepage: homepageArr,
        all: allArr,
        weekly: this.tempLayout.weekly
      }).subscribe((res)=>{
        console.log(res);
        this.fetchCategoryData();
        this.getLayout()
        this.isSaved = true;
      })
  }
}
