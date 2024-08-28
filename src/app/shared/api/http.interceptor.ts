import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req);
  }
}
