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

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  get signInForm() { return this.signInFormService.signInForm; }
  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }
  get test() { return this.helperService.getResourceUrl('test');}

  constructor(
    private signInService: SigninService,
    private signInFormService: SigninFormService,
    private toastService: ToastService,
    private tokenService: TokenService,
    private navController: NavController,
    private authService: AuthService,
    private userService: UserService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
  }

  login() {
    if (!this.signInForm.invalid) {
      this.signInService.signIn(this.signInForm.value)
      .subscribe(async result => {
        await this.tokenService.setToken(result);
        this.authService.isAuthenticated$.next(true);
        this.userService.fetchUserInformation();

        //navigate to summary page
        setTimeout(async() => {this.navController.navigateForward('/tabs/summary', { replaceUrl:true })}, 1000);
    });
    } else {
      this.signInForm.markAllAsTouched();
      this.toastService.showMessage('Please fill in the form correctly', true);
    }
    
  }

  registerPage() {
    
  }

}
