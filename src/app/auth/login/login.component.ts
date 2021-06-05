import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  back: string = environment.api_url;
  constructor(private auth: AuthService) { 
    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  ngOnInit(): void {
    this.auth.autoSignIn()
    this.auth.getAuthListener().subscribe(res=>{
    })
  }
  login() {
    this.auth.signin({email: this.formData.value.email,password: this.formData.value.password})
  }
  

}
