import { Component, OnInit } from '@angular/core';
import { ReloadService } from 'src/app/core/services/reload.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public reload$ : ReloadService) { }

  ngOnInit(): void {
  }

}
