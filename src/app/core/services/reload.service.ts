import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  reloadSubject: Subject<any>;
  reloadObservable: Observable<any>;
  gotoAndReload: (routerlink:string,params?:any)=>void
  constructor(public router:Router) { 
    this.reloadSubject = new Subject<any>()
    this.reloadObservable = this.reloadSubject.asObservable();
    this.gotoAndReload = (routerlink:string,params:any={}):void =>{
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([routerlink],{queryParams: params});
    }); 
    this.reloadSubject.next();
    }
  }
  
  gotoAndTrace(routerlink:String):void {
    this.router.navigate([routerlink],{queryParams: {from: document.location.href}});
  }
  goto(routerlink:String,params:any={}):void {
    this.router.navigate([routerlink],{queryParams: params});
  }
}
