import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SigninFormService {

  public signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    // at least 1 number
    password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)])
  });

  constructor() { }
}
