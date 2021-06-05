
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Auth } from '../models/auth.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authListener = new BehaviorSubject<boolean>(false);

  isVietnamese: boolean = false;

  constructor(private api: ApiService, private router: Router) {}

  signin(signinData: Auth){
    console.log(signinData)
    this.api.post('/apis/user/login', signinData).subscribe(
      (res) => {
        this.setAuth(res.token);
        this.authListener.next(true);
        this.setAuth(res.token);
        this.router.navigate(['/admin']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  autoSignIn() {
    let token;
    token = this.getAuth();
    if (token == null) {
      this.router.navigate(['/auth/login']);
    } else {
      let data = { token: token };
      this.api.post('/apis/user/autologin', data).subscribe(
        (res) => {
          this.authListener.next(true);
          this.router.navigate(['/admin']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getAuthListener(): Observable<boolean> {
    return this.authListener.asObservable();
  }

  logout(): void {
    this.clearAuth();
    this.authListener.next(false);
    this.router.navigate(['auth/sign-in']);
  }

  private setAuth(token: string): void {
    localStorage.setItem('token', token);
  }

  public getAuth() {
    return localStorage.getItem('token');
  }

  private clearAuth(): void {
    localStorage.clear();
  }
}
