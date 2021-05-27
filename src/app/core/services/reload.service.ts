import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {

  constructor(public router:Router) { }
  gotoAndReload(routerlink:string,params:any={}):void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([routerlink],{queryParams: params});
  }); 
  }
}
