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

  email: string;

  constructor(
    private helperService: HelperService,
    private http: HttpClient
  ) { }

  onboardingSubmission(body, onboardingSteps: string[]): Observable<{success: string, message: string, data: any}> {
    const url = this.helperService.getResourceUrl(OnboardingConstant.ONBOARDING_URL);
    const data: OnboardingModel = {
      ...body, requiredSections: onboardingSteps 
    }
    return this.http.post(url, data) as Observable<{success: string, message: string, data: any}>;
  }
}
