import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HelperService } from 'src/app/core/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private authService: AuthService
  ) { }

  signUp(data) {
    return this.authService.signUp(data);
  }
}
