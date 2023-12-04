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
import { AuthService } from 'src/app/core/services/auth.service';

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
    private authService: AuthService,
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
        switchMap((result) => {
          if (result?.error) {
            this.toastService.showMessage(result.message);
            return EMPTY;
          }
          return from(this.tokenService.setToken(result));
        }),
        switchMap(() => {
          this.authService.isAuthenticated$.next(true);
          return this.coreService.checkOnboardingStatus();
        })
      ).subscribe((onboardingResult) => {
        this.coreService.onboardingRequiredSections = onboardingResult?.data?.requiredSections;
        this.navController.navigateRoot('/onboarding', { replaceUrl:true })
      });
  }

}
