import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from 'src/app/core/models/item.model';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public Editor = ClassicEditor;
  public EditorData = ""
  pageIndex: number=0;
  maxPage:number;
  pageArray:Item[];
  setHeight(editor) {
    editor.editing.view.change((writer) => {
      writer.setStyle(
          "height",
          "150px",
          editor.editing.view.document.getRoot()
      );
      });
  }
  updatePage() {
    this.pageArray = this.itemArray.slice(this.pageIndex*20,this.pageIndex*20+20)
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
      description: new FormControl(),
      instock: new FormControl()
    })
  }
  ngOnInit(): void {
    this.fetchItemData();
    this.fetchImageData();
  }
  editItem(): void {
    this.formData.patchValue({description:this.EditorData})
    console.log(this.formData.value)
    this.API.patch("/apis/item",this.formData.value).subscribe((res)=>{
      console.log(res)
      this.fetchItemData()
      this.isItemDrawerOpened = false;
    })
  }
  addItem(): void {
    this.formData.patchValue({description:this.EditorData})
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
      this.maxPage = this.ngCeil(this.itemArray.length/20);
      this.updatePage()
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
      description: item.description,
      instock: item.instock
    })
    this.EditorData = this.formData.value.description;
  }
  openItemDrawerAsNew(): void {
    this.isEditing = false;
    this.isItemDrawerOpened = true;
    this.formData.reset();
    this.formData.patchValue({images: [],sizes: []})
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
  ngForLoop(times:number) {
   return Array(times).fill(0).map((x,i)=>i);
  }
  ngCeil(number:number) {
    return Math.ceil(number);
  }
}
