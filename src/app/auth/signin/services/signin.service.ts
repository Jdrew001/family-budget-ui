import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { AuthConstants } from '../../auth.constants';
import { HttpClient } from '@angular/common/http';
import { SignInModel } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService extends BaseService {

  constructor(
    private authService: AuthService
  ) {
    super();
  }

  signIn(signInModel: SignInModel): Observable<any> {
    return this.authService.signIn(signInModel);
  }
}
