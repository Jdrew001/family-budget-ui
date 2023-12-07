import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AddFamilyComponent } from 'src/app/shared/components/add-family/add-family.component';
import { OnboardingFormService } from '../services/onboarding-form.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-invite-family',
  templateUrl: './invite-family.component.html',
  styleUrls: ['./invite-family.component.scss'],
})
export class InviteFamilyComponent  implements OnInit {

  @ViewChild('addFam') addFamilyComponent: AddFamilyComponent;

  @Input() familyInviteForm: FormArray;
  @Input() userEmail: string;

  constructor(
    private onboardingFormService: OnboardingFormService,
    private toastService: ToastService
  ) { }

  ngOnInit() {}

  handleFamilyAction(item) {
    this.addFamilyComponent.presentModal({email: item} as any);
  }

  addFamily() {
    this.addFamilyComponent.presentModal();
  }

  onFamilyConfirm(name: string) {
    if (name == this.userEmail) {
      this.toastService.showMessage('You cannot invite yourself to your family', true);
      return;
    }
    this.onboardingFormService.createFamilyInviteFormGroup(name);
    this.addFamilyComponent.dismissModal();
  }

  onFamilyRemove(data: any) {
    if (!data?.email) return;
    this.onboardingFormService.deleteFamilyInviteFormGroup(data?.email);
  }

}
