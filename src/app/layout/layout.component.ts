import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor() { 
    
  }
  isInterrupted: boolean = false;
  ngOnInit(): void {
  }
  lerp(v0:any, v1:any, t:any):any {
    return v0*(1-t)+v1*t
  }

  onActivate() {
    this.isInterrupted = false;
    let prevPos = window.pageYOffset;
    let pos = window.pageYOffset;
    let scrollToTop = window.setInterval(() => {
        prevPos = pos;
        pos = window.pageYOffset;
        if (prevPos - pos < 0) {
          this.isInterrupted = true;
        }
        if (pos > 0&&!this.isInterrupted) {
            window.scrollTo(0, this.lerp(pos,0,0.05)); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }
}
