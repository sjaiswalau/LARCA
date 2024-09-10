import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HTTPInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req);
  }
}
