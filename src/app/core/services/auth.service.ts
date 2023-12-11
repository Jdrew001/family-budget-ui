import { Injectable } from '@angular/core';
import { SignInModel } from '../models/auth.model';
import { BaseService } from './base.service';
import { BehaviorSubject, EMPTY, Observable, finalize, from, switchMap, zip } from 'rxjs';
import { AuthConstants } from '../constants/auth.constants';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/token.model';
import { TokenService } from './token.service';
import { NavController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { UserService } from './user/user.service';
import { HelperService } from './helper.service';
import { CoreService } from './core.service';
import { AlertControllerService } from 'src/app/shared/services/alert-controller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private navController: NavController,
    private userService: UserService,
    private helperService: HelperService,
    private coreService: CoreService,
    private alertControllerService: AlertControllerService
  ) {
    
  }

  signIn(signInModel: SignInModel): Observable<any> {
    const url = this.helperService.getResourceUrl(AuthConstants.SIGN_IN_URL);
    return this.http.post(url, signInModel);
  }

  signUp(signUpModel: any): Observable<any> {
    const url = this.helperService.getResourceUrl(AuthConstants.SIGN_UP_URL);
    return this.http.post(url, signUpModel);
  }

  refreshToken(): Observable<TokenModel> {
    const url = this.helperService.getResourceUrl(AuthConstants.REFRESH_TOKEN_URL);
    return this.http.get(url) as Observable<TokenModel>;
  }

  /**
   * Validates the refresh token and performs necessary actions based on the result.
   * If the refresh token is valid, it sets the token, checks the family status,
   * displays an alert if necessary, fetches user information, stores it,
   * hides the splash screen, and navigates to the summary page.
   * If the refresh token is invalid, it navigates to the sign-in page and sets the authentication status to false.
   */
  async validateRefreshToken() {
    this.refreshToken()
    .pipe(
      switchMap(async (result) => {
        if (!result) {
          this.navController.navigateRoot('/auth/signin', { replaceUrl:true });
          this.isAuthenticated$.next(false);
          await SplashScreen.hide();
          return EMPTY;
        }

        return from(this.tokenService.setToken(result));
      }),
      switchMap(() => {
        this.isAuthenticated$.next(true);
        this.coreService.getMasterRefData();
        return this.coreService.checkOnboardingStatus();
      })
    ).subscribe(async (onboardingResult) => {
      this.coreService.onboardingRequiredSections = onboardingResult?.data?.requiredSections;
        await SplashScreen.hide();//
        if (onboardingResult?.data?.requiredSections?.length > 0) {
          this.navController.navigateRoot('/onboarding', { replaceUrl:true });
        } else {
          this.navController.navigateRoot('/tabs/summary', { replaceUrl:true });
        }
    });
  }

  async logout() {
    const url = this.helperService.getResourceUrl(AuthConstants.LOGOUT_URL);
    this.http.get(url).subscribe(async () => {
      await this.tokenService.removeToken();
      this.isAuthenticated$.next(false);
      this.navController.navigateRoot('/signin', { replaceUrl:true });
    });
  }
}
