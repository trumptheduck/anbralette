import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/services/api.service';
import { ReloadService } from '../core/services/reload.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  back: string = environment.api_url;
  categoryArray:any[];
  selectedCat:any;
  selectedSubcat:any;
  isAll:boolean;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private API : ApiService,
    public reload$: ReloadService
  ) {
    this.categoryArray = [];
    this.selectedCat = {
      name: "",
      _id: "",
      children: []
    }
    this.selectedSubcat = {
      name: "",
      _id: "",
      item: []
    }
   }

  ngOnInit(): void {
    this.getAllCategory(()=>{
      this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (params.category === undefined) {
          this.router.navigate(['home']);
        }
        if (params.subcategory === undefined) {
          this.isAll = true;
        } else {
          this.isAll = false;
        }
        if (this.isAll) {
          this.selectedCat = this.categoryArray.find(cat=>cat._id === params.category)
        } else {
          this.selectedCat = this.categoryArray.find(cat=>cat._id === params.category)
          this.selectedSubcat = this.selectedCat.children.find(subcat=>subcat._id === params.subcategory)
        }
        console.log(this.selectedSubcat)
      }
    );
    })
  }
  getAllCategory(callback) {
    this.API.get("/apis/categories").subscribe((res)=>{
      this.categoryArray = res;
      callback()
    })
  }
  getItemArray(category:any):any[] {
    var itemArray = [];
    if (category?.children?.length !== undefined) {
      category.children.forEach(child=> {
        if (Array.isArray(child.item)) {
          itemArray = itemArray.concat(child.item);
        }
      })
    }
    return itemArray
  }
  calculateDiscount(price:number,discount:number):number {
    return Math.ceil(100-discount/price*100)
  }
}
