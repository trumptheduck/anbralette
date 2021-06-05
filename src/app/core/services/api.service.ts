import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}
  getAuth() {
    return localStorage.getItem('token');
  }
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    var parameters = new HttpParams();
    parameters = parameters.set("token",this.getAuth())
    return this.http
      .get(`${environment.api_url}${path}`, { params: parameters })
      .pipe(catchError(this.handleError));
  }

  put(path: string, body: Object = {}): Observable<any> {
    var parameters = new HttpParams();
    parameters = parameters.set("token",this.getAuth())
    return this.http
      .put(`${environment.api_url}${path}`, body,{params: parameters})
      .pipe(catchError(this.handleError));
  }

  patch(path: string, body: Object = {}): Observable<any> {
    var parameters = new HttpParams();
    parameters = parameters.set("token",this.getAuth())
    return this.http
      .patch(`${environment.api_url}${path}`, body,{params: parameters})
      .pipe(catchError(this.handleError));
  }

  post(path: string, body: Object = {}): Observable<any> {
    var parameters = new HttpParams();
    parameters = parameters.set("token",this.getAuth())
    return this.http
      .post(`${environment.api_url}${path}`, body,{params: parameters})
      .pipe(catchError(this.handleError));
  }

  delete(path: string, body: Object = {}): Observable<any> {
    var parameters = new HttpParams();
    parameters = parameters.set("token",this.getAuth())
    return this.http
      .delete(`${environment.api_url}${path}`,{params: parameters})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error.error);
  }
}