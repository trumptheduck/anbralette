import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { ReloadService } from '../core/services/reload.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  isMenuOpened:boolean = false;
  constructor(private auth: AuthService,private reload$: ReloadService) { }
  ngOnInit(): void {

  }
  logout() {
    this.auth.logout();
    this.reload$.gotoAndReload("/auth/login")
  }
}
