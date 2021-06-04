import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/services/api.service';
import { ReloadService } from '../core/services/reload.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  back: string = environment.api_url;
  itemArray:any;
  filteredItemArray:any;
  inputQuery:string = "";
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private API : ApiService,
    public reload$: ReloadService
  ) {
    this.itemArray = [];
    this.filteredItemArray = []
   }

  ngOnInit(): void {
   this.fetchItemData()
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
  fetchItemData():void {
    this.API.get("/apis/items").subscribe((res)=>{
      this.itemArray = res;
      console.log(res)
      this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (params.q !== undefined) {
          this.filterItem(params.q);
          this.inputQuery = params.q
        } else {
          this.filterItem("");
        }
      });
    })
  }
  onQueryChange() {
    this.filterItem(this.inputQuery);
  }
  filterItem(query) {
    if (query !== "") {
      this.filteredItemArray = this.itemArray.slice().filter(elem => {
        let result = false;
          for (let key in elem) {
            if (this.safeToString(elem[key]).search(query) !== -1) {
              if (key === "name"||key === "item_id") {
                result = true;
              }
            }
          }
          return result;
      });
    } else {
      this.filteredItemArray = this.itemArray.slice()
    }
  }
  calculateDiscount(price:number,discount:number):number {
    return Math.ceil(100-discount/price*100)
  }
}
