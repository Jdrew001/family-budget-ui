import { Component, OnInit } from '@angular/core';
import { SigninService } from './services/signin.service';
import { SigninFormService } from './services/signin-form.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { HelperService } from 'src/app/core/services/helper.service';
import { EMPTY, finalize, from, switchMap, zip } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { AlertControllerService } from 'src/app/shared/services/alert-controller.service';
import { delay } from 'lodash';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  get signInForm() { return this.signInFormService.signInForm; }
  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }
  
  authenticated: boolean = false;

  errorMessage: string = '';

  constructor(
    private signInService: SigninService,
    private signInFormService: SigninFormService,
    private toastService: ToastService,
    private navController: NavController,
    private authService: AuthService,
    private userService: UserService,
    private coreService: CoreService,
    private tokenService: TokenService,
    private alertControllerService: AlertControllerService
  ) { }

  ngOnInit() {
  }

  login() {
    if (!this.signInForm.invalid) {
      this.signInService.signIn(this.signInForm.value)
      .pipe(
        switchMap((result) => {
          if (!result) {
            this.navController.navigateRoot('/auth/signin', { replaceUrl:true });
            this.authService.isAuthenticated$.next(false);
            return EMPTY;
          }
          return from(this.tokenService.setToken(result));
        }),
        switchMap(() => {
          this.authService.isAuthenticated$.next(true);
          this.authenticated = true;
          this.navController.navigateRoot('/tabs/summary', { replaceUrl:true });
          this.signInFormService.signInForm.reset();
          return this.coreService.checkFamilyStatus()
        }),
        switchMap((familyStatus) => {
          if (familyStatus?.data?.dialogConfig) {
            this.alertControllerService.alertBoxSubject$.next({config: familyStatus?.data?.dialogConfig, show: true});
          }  

          return this.userService.fetchUserInformation();
        }),
        switchMap((userInformation) => {
          return from(this.userService.storeUserInformation(userInformation))
        }),
      )
      .subscribe(() => {
        this.userService.resyncUserInformation$.next(true);      
    });
    } else {
      this.signInForm.markAllAsTouched();
      this.toastService.showMessage('Please provide all the required fields!', true);
    }
    
  }

  registerPage() {console.log('registerPage')
    this.navController.navigateRoot('/signup', { replaceUrl:true });
  }

}
