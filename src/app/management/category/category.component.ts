import { Component, HostListener, OnInit } from '@angular/core';
import { Item } from 'src/app/core/models/item.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryArray:any[];
  windowTitle:string;
  isWindowOpened: boolean = false;
  isItemWindowOpenned: boolean = false;
  formName:string;
  selCategory:any=null;
  apiPath: string = "";
  itemArray:any[];
  itemSelector: {
    subcat: any;
    selItem: any[],
    allItem: any[],
    filtered: {
      sel: any[],
      curr: any[],
    }
  }
  pageIndex: number=0;
  maxPage:number;
  pageArray:Item[];
  updatePage() {
    this.updateQueryCurr()
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
  selModel:string;
  currModel:string;
  constructor(private API: ApiService) { 
    this.windowTitle = "";
    this.itemSelector = {
      subcat: null,
      selItem: [],
      allItem: [],
      filtered: {
        sel: [],
        curr: []
      }
    }
  }
  safeToString(x) {
    switch (typeof x) {
      case 'object':
        return '*';
      case 'function':
        return '*';
      default:
        return x + '';
    }
  }
  ngOnInit(): void {
    this.fetchCategoryData();
    this.fetchItemData();
  }
  fetchItemData():void {
    this.API.get("/apis/items").subscribe((res)=>{
      this.itemArray = res;
      console.log(res)
    })
  }
  fetchCategoryData (): void {
    this.API.get("/apis/categories").subscribe((res)=>{
      console.log(res);
      this.categoryArray = res;
    })
  }
  openWindowNewCategory():void {
    this.formName = "";
    this.windowTitle="Thêm danh mục"
    this.isWindowOpened = true;
    this.apiPath = "/apis/category";
  }
  openWindowNewSubCategory(category:any):void {
    this.formName = "";
    this.selCategory = category;
    this.windowTitle="Thêm danh mục phụ"
    this.isWindowOpened = true;
    this.apiPath = "/apis/subcategory";
  }
  openEditItemWindow(items:Item[],subcategory:any) {
    this.itemSelector.subcat = subcategory;
    this.isItemWindowOpenned = true;
    this.itemSelector.selItem = items.slice();
    this.itemSelector.allItem = this.itemArray.slice().filter(n=>!this.itemSelector.selItem.some(item => item._id === n._id));
    this.itemSelector.filtered.sel = this.itemSelector.selItem.slice();
    this.itemSelector.filtered.curr = this.itemSelector.allItem.slice();
    this.updatePage()
  }
  updateQueryCurr() {
    if (this.currModel !== "") {
      this.itemSelector.filtered.curr = this.itemSelector.allItem.slice().filter(elem => {
        let result = false;
          for (let key in elem) {
            if (this.safeToString(elem[key]).search(this.currModel) !== -1) {
              if (key === "name"||key === "item_id") {
                result = true;
              }
            }
          }
          return result;
      });
    } else {
      this.itemSelector.filtered.curr = this.itemSelector.allItem.slice()
    }
    this.maxPage = Math.ceil(this.itemSelector.filtered.curr.length/20)
    this.pageArray = this.itemSelector.filtered.curr.slice(this.pageIndex*20,this.pageIndex*20+20)
  }
  updateQuerySel() {
    if (this.selModel !== "") {
      this.itemSelector.filtered.sel = this.itemSelector.selItem.slice().filter(elem => {
        let result = false;
          for (let key in elem) {
            if (this.safeToString(elem[key]).search(this.selModel) !== -1) {
              if (key === "name"||key === "item_id") {
                result = true;
              }
            }
          }
          return result;
      });
    } else {
      this.itemSelector.filtered.sel = this.itemSelector.selItem.slice()
    }
  }
  addItem(item) {
    this.itemSelector.selItem.push(item);
    this.updateReducedItemArray()
    this.updateQueryCurr()
    this.updateQuerySel()
  }
  removeItem(item) {
    var isExisted = this.itemSelector.selItem.find(elem => elem._id === item._id)
    if (isExisted !== undefined) {
      this.itemSelector.selItem.splice(this.itemSelector.selItem.indexOf(isExisted),1);
    }
    this.updateReducedItemArray()
    this.updateQueryCurr()
    this.updateQuerySel()
  }
  updateReducedItemArray() {
    this.itemSelector.allItem = this.itemArray.slice().filter(n=>!this.itemSelector.selItem.some(item => item._id === n._id));
  }
  deleteCategory(category:any) {
    this.API.post("/apis/category/remove",{
      category: category,
    }).subscribe((res)=>{
      console.log(res)
      this.fetchCategoryData();
    })
  }
  saveItems() {
    var data = [];
    this.itemSelector.selItem.forEach(item => {
      data.push(item._id);
    })
    console.log(data,this.itemSelector.subcat)
    this.API.patch("/apis/subcategory",{
      items: data,
      subCategory: this.itemSelector.subcat,
    }).subscribe((res)=>{
      this.isItemWindowOpenned = false;
      console.log(res)
      this.fetchCategoryData()
    })
  }
  deleteSubCategory(category:any,subcategory:any) {
    this.API.post("/apis/subcategory/remove",{
      category: category,
      subCategory: subcategory
    }).subscribe((res)=>{
      console.log(res)
      this.fetchCategoryData();
    })
  }
  ngForLoop(times:number) {
    return Array(times).fill(0).map((x,i)=>i);
   }
  commitChanges():void {
    if (this.apiPath === "/apis/category") {
      this.API.post(this.apiPath,{
        name: this.formName
      }).subscribe((res)=>{
        console.log(res)
        this.fetchCategoryData()
        this.isWindowOpened = false;
      })
    } else if (this.apiPath === "/apis/subcategory") {
      this.API.post(this.apiPath,{
        category: this.selCategory,
        subCategory: {
          name: this.formName,
        }
      }).subscribe((res)=>{
        this.isWindowOpened = false;
        console.log(res)
        this.fetchCategoryData()
      })
    }
  }
}
