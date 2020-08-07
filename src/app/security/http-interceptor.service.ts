import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {UserService} from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private login: string;
  private token: string;

  constructor(private storage: Storage, private userService: UserService) {
    this.userService.activeCustomer$.subscribe(customer => {
      this.login = customer.id;
      this.storage.get(this.login + 'token').then(dataToken =>
        this.token = dataToken);
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let httpClone;
      if (this.token != null) {
        httpClone = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.token}`
          }
        });
          return next.handle(httpClone);
      } else{
          return next.handle(req);
      }

    }
}
