import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  isMenuOpened:boolean = false;
  constructor() { }
  ngOnInit(): void {
    
  }
}
