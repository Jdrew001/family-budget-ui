import { Component, OnInit } from '@angular/core';
import { OnboardingConstant } from './onboarding.constant';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  currentPage = 0;

  constructor() { }

  ngOnInit() {
  }

  getTitleDescription(type: 'title' | 'description') {
    const data = OnboardingConstant.ONBOARDING_PAGE_DATA[this.currentPage];
    if (!data) return '';

    return data[type];
  }

  nextStep() {
    
  }

}
