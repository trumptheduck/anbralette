import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from 'src/app/core/models/item.model';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  back:string = environment.api_url;
  imageGallery_deleteArray:string[];
  imageArray: string[];
  formData: FormGroup;
  constructor(private API: ApiService) { }
  pageIndex: number=0;
  maxPage:number;
  pageArray:string[];
  updatePage() {
    this.pageArray = this.imageArray.slice(this.pageIndex*30,this.pageIndex*30+20)
  }
  nextPage() {
    if (this.pageIndex + 1 > this.maxPage) {
      return
    } else {
      this.pageIndex ++
      console.log(this.pageIndex)
      this.updatePage()
    }
  }
  onPageChange(event) {
    this.pageIndex = parseInt(event.target.options[event.target.selectedIndex].value)
    this.updatePage()
  }
  previousPage() {
    if (this.pageIndex - 1 < 0) {
      return
    } else {
      this.pageIndex --
      console.log(this.pageIndex)
      this.updatePage()
    }
  }
  ngOnInit(): void {
    this.imageGallery_deleteArray=[];
    this.imageArray=[];
    this.fetchImageData()
  }
  ngForLoop(times:number) {
    return Array(times).fill(0).map((x,i)=>i);
   }
  fetchImageData(): void {
    this.API.get("/apis/files").subscribe((res)=>{
      this.imageArray = res.files.reverse();
      console.log("img",res)
      var isExisted = this.imageArray.find(elem => elem === ".gitkeep");
      if (isExisted !== undefined) {
        this.imageArray.splice(this.imageArray.indexOf(isExisted),1) 
      }
      this.maxPage = Math.ceil(this.imageArray.length/30);
      this.updatePage()
    })
  }
  imageGallery_deleteItem(index:number) : void {
    var isExisted = this.imageGallery_deleteArray.find(image => image === this.imageArray[index]) 
    if (isExisted !== undefined) {
      this.imageGallery_deleteArray.splice(this.imageGallery_deleteArray.indexOf(isExisted),1)
    } else {
      this.imageGallery_deleteArray.push(this.imageArray[index])
    }
  }
  imageGallery_checkIfExisted(src:string) {
    var isExisted = this.imageGallery_deleteArray.find(image => image === src);
    if (isExisted) {return true}
    return false
  }
  imageGallery_delete():void {
    this.API.post("/apis/deletefiles",{files: this.imageGallery_deleteArray}).subscribe((res)=>{
      console.log(res);
      this.fetchImageData()
    })
  }
}
