import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Item } from '../core/models/item.model';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  viewIndex: number = 0;
  back:string = environment.api_url;
  imageSelector_selIndex:number;
  imageSelector_tempArray:string[];
  imageGallery_deleteArray:string[];
  isItemDrawerOpened:boolean = false;
  isSelectingImages:boolean = false;
  isEditing:boolean = false;
  itemArray: Item[];
  imageArray: string[];
  imageSelectorArray:string[];
  selectedItem: any;
  formData: FormGroup;
  constructor(private API: ApiService) { 
    this.itemArray = [];
    this.imageArray = [];
    this.imageSelectorArray = [];
    this.imageSelector_selIndex=-1;
    this.imageSelector_tempArray=[];
    this.imageGallery_deleteArray=[];
    this.formData = new FormGroup({
      _id : new FormControl(),
      item_id : new FormControl(),
      name: new FormControl(),
      sizes: new FormControl(),
      price: new FormControl(),
      discount: new FormControl(),
      images: new FormControl(),
      description: new FormControl()
    })
  }

  ngOnInit(): void {
    this.fetchItemData();
    this.fetchImageData();
  }

  editItem(): void {
    console.log(this.formData.value)
    this.API.patch("/apis/item",this.formData.value).subscribe((res)=>{
      console.log(res)
      this.fetchItemData()
      this.isItemDrawerOpened = false;
    })
  }
  addItem(): void {
    console.log(this.formData.value)
    this.API.post("/apis/item",this.formData.value).subscribe((res)=>{
      console.log(res)
      this.fetchItemData()
      this.isItemDrawerOpened = false;
    })
  }
  deleteItem(): void {
    console.log(this.formData.value)
    this.API.post("/apis/item/remove",this.formData.value).subscribe((res)=>{
      console.log(res)
      this.fetchItemData()
      this.isItemDrawerOpened = false;
    })
  }
  fetchItemData():void {
    this.API.get("/apis/items").subscribe((res)=>{
      this.itemArray = res;
      console.log(res)
    })
  }
  fetchImageData(): void {
    this.API.get("/apis/files").subscribe((res)=>{
      this.imageArray = res.files;
      console.log("img",res)
    })
  }
  openItemDrawer(item:Item): void {
    this.isEditing = true;
    this.selectedItem = item;
    this.isItemDrawerOpened = true;
    this.formData.patchValue({
      _id: item._id,
      item_id : item.item_id,
      name: item.name,
      sizes: item.sizes,
      price: item.price,
      discount: item.discount,
      images: item.images,
      description: item.description
    })
  }
  openItemDrawerAsNew(): void {
    this.isEditing = false;
    this.isItemDrawerOpened = true;
    this.formData.reset();
  }

  ////////////////////////////////////////
  selectImages(): void {
    if (Array.isArray(this.formData.value.images)) {
      this.imageSelector_tempArray =  this.formData.value.images.slice();
    } else {
      this.imageSelector_tempArray = [];
    }
    this.isSelectingImages = true;
  }
  selectImages_setIndex(index:number):void {
    this.imageSelector_selIndex = index;
  }
  selectImages_setGalleryIndex(index:number):void {
    if (this.imageSelector_selIndex !== -1) {
      console.log(this.imageArray[index])
      this.imageSelector_tempArray.splice(this.imageSelector_selIndex,1,`/static/contents/${this.imageArray[index]}`)
      this.imageSelector_selIndex = -1;
    }
  }
  selectImages_delete():void {
    if (this.imageSelector_selIndex !== -1) {
      this.imageSelector_tempArray.splice(this.imageSelector_selIndex,1)
    }
  }
  selectImages_save():void {
    this.formData.patchValue({images:this.imageSelector_tempArray})
    this.isSelectingImages = false;
  }
  selectImages_add():void {
    this.imageSelector_tempArray.push("")
  }
  ////////////////////////////////////////////////////////////////
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
