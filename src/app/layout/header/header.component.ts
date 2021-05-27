import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ReloadService } from 'src/app/core/services/reload.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isTopped: boolean = true;
  isDrawerOpened: boolean = false;
  constructor(public reload$: ReloadService) { }

  ngOnInit(): void {
  }
  toggleDrawer():void {
    this.isDrawerOpened = !this.isDrawerOpened;
    if (!this.isDrawerOpened) {
      setTimeout(()=>{
        if (window.scrollY === 0) {
          this.isTopped = true;
        } else {
          this.isTopped = false
        }
      },250)
    } else {
      this.isTopped = false;
    }

  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
      if (window.scrollY === 0) {
        this.isTopped = true;
      } else {
        this.isTopped = false
      }
  }


}
