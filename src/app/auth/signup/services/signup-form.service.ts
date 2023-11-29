import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupFormService {

  public signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    // at least 1 number
    password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)])
  }, {
    validators: passwordMatchValidator
  });

  constructor() { }
}

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
}

