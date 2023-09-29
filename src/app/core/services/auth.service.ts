import { Injectable } from '@angular/core';
import { SignInModel } from '../models/auth.model';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthConstants } from '../constants/auth.constants';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/token.model';
import { TokenService } from './token.service';
import { NavController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private navController: NavController,
    private userService: UserService
  ) {
    super();
  }

  signIn(signInModel: SignInModel): Observable<any> {
    const url = this.BASE_URL + AuthConstants.SIGN_IN_URL;
    return this.http.post(url, signInModel);
  }

  signUp(signUpModel: any): Observable<any> {
    const url = this.BASE_URL + AuthConstants.SIGN_UP_URL;
    return this.http.post(url, signUpModel);
  }

  refreshToken(): Observable<TokenModel> {
    const url = this.BASE_URL + AuthConstants.REFRESH_TOKEN_URL;
    return this.http.get(url) as Observable<TokenModel>;
  }

  async validateRefreshToken() {
    this.refreshToken().subscribe(async result => {
      if (!result) {
        this.navController.navigateRoot('/auth/signin', { replaceUrl:true });
        this.isAuthenticated$.next(false);
        return;
      }

      await this.tokenService.setToken(result);
      this.isAuthenticated$.next(true);
      setTimeout(async() => {await SplashScreen.hide();}, 2000);

      //redirect the user to /summary page
      this.navController.navigateRoot('/tabs/summary', { replaceUrl:true });
      this.userService.fetchUserInformation();
    });
  }
}
