import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private spinnerService: SpinnerService) { }

  removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);

    }
    this.spinnerService.spinner$.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);
    this.spinnerService.spinner$.next(true);
    return new Observable((observer: Observer<any>) => {
        console.log(request)
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          err => { this.removeRequest(request); observer.error(err); },
          () => { this.removeRequest(request); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }
}
