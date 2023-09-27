import { Component, OnInit } from '@angular/core';
import { SigninService } from './services/signin.service';
import { SigninFormService } from './services/signin-form.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  get signInForm() { return this.signInFormService.signInForm; }
  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }

  constructor(
    private signInService: SigninService,
    private signInFormService: SigninFormService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  login() {
    if (!this.signInForm.invalid) {
      this.signInService.signIn(this.signInForm.value)
      .subscribe(result => {
        console.log('result', result);
    });
    } else {
      this.signInForm.markAllAsTouched();
      this.toastService.showMessage('Please fill in the form correctly', true);
    }
    
  }

  registerPage() {
    
  }

}
