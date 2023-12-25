import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, finalize, from, switchMap, take } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { TokenModel } from '../models/token.model';
import { AuthConstants } from '../constants/auth.constants';
import { NavController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  token: TokenModel;
  isRefreshingToken: boolean = false;
  refreshTokenFinished$: Subject<TokenModel> = new Subject<TokenModel>();

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private navController: NavController,
    private toastService: ToastService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handle(req, next).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 403 && error.status !== 401) {
          this.toastService.showMessage('Something went wrong. Please try again later.', true);
        }
        return EMPTY;
      })
    );
  }

  handle(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.tokenService.getToken()).pipe(
      switchMap((token) => {
        this.token = token;
  
        // skip certain URLS -- add in constant
        if (req.url.includes(AuthConstants.SIGN_IN_URL) || req.url.includes(AuthConstants.SIGN_UP_URL)) {
          return next.handle(req);
        }
  
        if (!this.token) {
          this.navController.navigateRoot('/signin', { replaceUrl:true });
          return EMPTY;
        }
  
        //check if we are refreshing the token
        if (req.url.includes('refreshToken')) {
          //set the header to include the refresh token
          req = this.addTokenToHeader(req, this.token.refreshToken);
          return next.handle(req);
        }
  
        req = this.addTokenToHeader(req, this.token.accessToken);
  
        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(req, next, error)
          })
        );
      })
    );
  }

  private handleError(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): Observable<any> {
    if (error.status !== 403 && error.status !== 401) return next.handle(request);

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      return this.authService.refreshToken().pipe(
        switchMap((token: TokenModel) => {
          if (token.accessToken && token.refreshToken) {
            this.tokenService.setToken(token);
            this.refreshTokenFinished$.next(token);
            request = this.addTokenToHeader(request, token.accessToken);
            return next.handle(request);
          }

          //error block - we should call code here to show an error
          return EMPTY;
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.refreshTokenFinished$.pipe(
        take(1),
        switchMap((token) => {
          request = this.addTokenToHeader(request, token.accessToken);
          return next.handle(request)
        })
      );
    }
  }

  private addTokenToHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
