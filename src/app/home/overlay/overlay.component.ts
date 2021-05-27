import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  isBannerVisible: boolean = true;
  isDiscountVisible: boolean = true;
  constructor() { }
  ngOnInit(): void {
  }

}
