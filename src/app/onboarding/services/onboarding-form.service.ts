import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingFormService {

  onboardingForm: FormGroup;

  get profileForm() { return this.onboardingForm.get('profile') as FormGroup; }
  get accountsFormArray() { return this.onboardingForm.get('accounts') as FormArray; }
  get categoriesFormArray() { return this.onboardingForm.get('categories') as FormArray; }
  get familyInvitesFormArray() { return this.onboardingForm.get('familyInvites') as FormArray; }

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) { }

  createFormGroup() {
    this.onboardingForm = new FormGroup({
      profile: this.createProfileFormGroup(),
      accounts: this.createAccountsFormArray(),
      categories: this.createCategoriesFormArray(),
      familyInvites: this.createFamilyInvitesFormArray()
    });
  }

  createProfileFormGroup() {
    return new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      phone: new FormControl(''),
      timezone: new FormControl(Intl.DateTimeFormat().resolvedOptions().timeZone),
    });
  }

  setRequiredFields(requiredSections: string[]) {
    requiredSections.forEach((section) => {
      switch(section) {
        case 'profile':
          this.profileForm.get('firstname').setValidators(Validators.required);
          this.profileForm.get('lastname').setValidators(Validators.required);
          this.profileForm.get('phone').setValidators(Validators.required);
          this.profileForm.updateValueAndValidity();
          break;
        case 'accounts':
          this.accountsFormArray.setValidators(Validators.required);
          this.accountsFormArray.updateValueAndValidity();
          break;
        case 'categories':
          this.categoriesFormArray.setValidators(Validators.required);
          this.categoriesFormArray.updateValueAndValidity();
          break;
        case 'familyInvites':
          this.familyInvitesFormArray.setValidators(Validators.required);
          this.familyInvitesFormArray.updateValueAndValidity();
          break;
      }
    });
  }

  createAccountFormGroup(data) {
    const keys = Object.keys(data);
    const formGroup = new FormGroup({});
    keys.forEach((key) => {
      formGroup.addControl(key, new FormControl(key == 'id' ? this.accountsFormArray.length.toString() :data[key]));
    });
    this.accountsFormArray.push(formGroup);
  }

  patchAccountFormGroup(data) {
    const index = this.accountsFormArray.controls.findIndex((account) => account.get('id').value == data.id);
    this.accountsFormArray.at(index).patchValue(data);
  }

  deleteAccountFormGroup(id: string) {
    const index = this.accountsFormArray.controls.findIndex((account) => account.get('id').value == id);
    this.accountsFormArray.removeAt(index);
  }

  createCategoryFormGroup(data) {
    const keys = Object.keys(data);
    const formGroup = new FormGroup({});

    if (data?.id) {
      const index = this.categoriesFormArray.controls.findIndex((category) => category.get('id').value == data.id);
      this.categoriesFormArray.at(index).patchValue(data);
      return
    }

    keys.forEach((key) => {
      formGroup.addControl(key, new FormControl(key == 'id' ? null :data[key]));
    });
    this.categoriesFormArray.push(formGroup);
  }

  deleteCategoryFormGroup(id: string) {
    const index = this.categoriesFormArray.controls.findIndex((category) => category.get('id').value == id);
    this.categoriesFormArray.removeAt(index);
  }

  createFamilyInviteFormGroup(data: string) {
    const formGroup = new FormGroup({});
    const isDuplicate = this.familyInvitesFormArray.controls.some((invite) => invite.get('email').value == data);
    if (isDuplicate) {
      this.toastService.showMessage('Duplicate email address', true);
      return;
    }

    formGroup.addControl('email', new FormControl(data));
    this.familyInvitesFormArray.push(formGroup);
  }

  deleteFamilyInviteFormGroup(id: string) {
    const index = this.familyInvitesFormArray.controls.findIndex((invite) => invite.get('email').value == id);
    this.familyInvitesFormArray.removeAt(index);
  }

  private createAccountsFormArray() {
    return new FormArray([]);
  }

  private createCategoriesFormArray() {
    return new FormArray([]);
  }

  private createFamilyInvitesFormArray() {
    return new FormArray([]);
  }
}
