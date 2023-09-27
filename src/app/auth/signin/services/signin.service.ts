import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInModel } from '../models/signin.model';
import { BaseService } from 'src/app/core/services/base.service';
import { AuthConstants } from '../../auth.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  signIn(signInModel: SignInModel): Observable<any> {
    const url = this.BASE_URL + AuthConstants.SIGN_IN_URL;
    return this.http.post(url, signInModel);
  }
}
