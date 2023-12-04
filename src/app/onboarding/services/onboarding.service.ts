import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { OnboardingConstant } from '../onboarding.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnboardingModel } from '../model/onboarding.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(
    private helperService: HelperService,
    private http: HttpClient
  ) { }

  onboardingSubmission(body, partial: boolean): Observable<{success: string, message: string, data: any}> {
    const url = this.helperService.getResourceUrl(OnboardingConstant.ONBOARDING_URL);
    const data: OnboardingModel = {
      ...body, partial 
    }
    return this.http.post(url, data) as Observable<{success: string, message: string, data: any}>;
  }
}
