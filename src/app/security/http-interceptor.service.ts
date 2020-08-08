import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.userService.getToken();
      let httpClone;
      if (token != null) {
        httpClone = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
          return next.handle(httpClone);
      } else{
          return next.handle(req);
      }

    }
}
