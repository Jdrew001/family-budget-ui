import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, from, lastValueFrom } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenModel } from '../models/token.model';
import { AuthConstants } from '../constants/auth.constants';
import { NavController } from '@ionic/angular';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  token: TokenModel;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private navController: NavController
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    this.token = await this.tokenService.getToken();

    // skip certain URLS -- add in constant
    if (req.url.includes(AuthConstants.SIGN_IN_URL) || req.url.includes(AuthConstants.SIGN_UP_URL)) {
      return await lastValueFrom(next.handle(req))
    }
    
    if (!this.token) {
      this.navController.navigateRoot('/signin', { replaceUrl:true });
      return EMPTY;
    }

    //check if we are refreshing the token
    if (req.url.includes('refreshToken')) {
      //set the header to include the refresh token
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token.refreshToken}`
        }
      })
      return await lastValueFrom(next.handle(req));
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token.accessToken}`
      }
    })

    return await lastValueFrom(next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 403 || error.status === 401) {
      this.authService.refreshToken().subscribe(result => {
        this.tokenService.setToken(result);
      })
    }
    return EMPTY;
  }
}
