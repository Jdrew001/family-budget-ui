import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }

  setRequiredFields(requiredSections: string[]) {
    requiredSections.forEach((section) => {
      switch(section) {
        case 'profile':
          this.profileForm.setValidators(Validators.required);
          break;
        case 'accounts':
          this.accountsFormArray.setValidators(Validators.required);
          break;
        case 'categories':
          this.categoriesFormArray.setValidators(Validators.required);
          break;
        case 'familyInvites':
          this.familyInvitesFormArray.setValidators(Validators.required);
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
      formGroup.addControl(key, new FormControl(key == 'id' ? this.categoriesFormArray.length.toString() :data[key]));
    });
    this.categoriesFormArray.push(formGroup);
  }

  deleteCategoryFormGroup(id: string) {
    const index = this.categoriesFormArray.controls.findIndex((category) => category.get('id').value == id);
    this.categoriesFormArray.removeAt(index);
  }

  private createAccountsFormArray() {
    return new FormArray([], Validators.required);
  }

  private createCategoriesFormArray() {
    return new FormArray([], Validators.required);
  }

  private createFamilyInvitesFormArray() {
    return new FormArray([]);
  }
}
