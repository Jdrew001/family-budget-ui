import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SignupService } from './services/signup.service';
import { SignupFormService } from './services/signup-form.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { EMPTY, from, of, switchMap } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AlertControllerService } from 'src/app/shared/services/alert-controller.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  get signUpForm() { return this.signUpFormService.signupForm; }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get confirmPassword() { return this.signUpForm.get('confirmPassword'); }
  get passwordsMisMatch() { return this.signUpForm.hasError('passwordMismatch'); }

  constructor(
    private navController: NavController,
    private signUpFormService: SignupFormService,
    private toastService: ToastService,
    private signupService: SignupService,
    private coreService: CoreService,
    private tokenService: TokenService,
    private userService: UserService,
    private alertControllerService: AlertControllerService
  ) { }

  ngOnInit() {
  }

  signInPage() {
    this.navController.navigateRoot('/signin', { replaceUrl:true });
  }

  register() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.toastService.showMessage('Please provide all the required fields!', true);
      return;
    }

    this.signupService.signUp(this.signUpForm.getRawValue())
      .pipe(
        //result of the registration service
        switchMap((result) => {
          if (result?.error) {
            this.toastService.showMessage(result.message);
            return EMPTY;
          }
          return from(this.tokenService.setToken(result));
        }),
        // result of storing the tokens from register service
        switchMap(() => {
          return this.coreService.checkRegistrationStatus();
        }),
        // result of checking registration status
        switchMap((result: {success: string, message: string, data: any}) => {
          if (!result.success) {
            this.toastService.showMessage(result.message);
            return EMPTY;
          }

          if (!result?.data) return EMPTY;

          const userInvited = result.data?.userInvited;
          if (userInvited) {
            return this.coreService.checkFamilyStatus();
          }

          //TODO: if the user has not been invited, we want to redirect to onboarding page
          console.warn('TODO: redirect to onboarding page')
          return EMPTY;
        }),
        // result of checking family status
        switchMap((familyStatus) => {
          if (familyStatus?.data?.dialogConfig) {
            this.alertControllerService.alertBoxSubject$.next({config: familyStatus?.data?.dialogConfig, show: true});
          }  

          return this.userService.fetchUserInformation();
        }),
        // result of fetching user information
        switchMap((userInformation) => {
          return from(this.userService.storeUserInformation(userInformation))
        })
        // result of storing user information
      ).subscribe(() => {
        this.userService.resyncUserInformation$.next(true);

        // a result that occurs down here means we can redirect to summary screen.
        // User is registered and is a part of a family
        this.navController.navigateRoot('/tabs/summary', { replaceUrl:true });
      })
  }

}
