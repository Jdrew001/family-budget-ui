import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';
import { OnboardingFormService } from '../services/onboarding-form.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent  implements OnInit {

  @Input() categoryForm: FormArray;

  selectedCategoryType = null;

  constructor(
    private modalController: ModalController,
    private onboardingFormService: OnboardingFormService
  ) { }

  ngOnInit() {}

  addCategory() {
    this.presentAddCategoryModal();
  }

  async presentAddCategoryModal(category = null) {
    const modal = await this.modalController.create({
      component: AddCategoryComponent,
      componentProps: {
        category: category
      }
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    this.handleModalOutput(data, role);
  }

  handleModalOutput(data: any, role: string) {
    if (role == 'confirm') {
      this.onboardingFormService.createCategoryFormGroup(data);
    }

    if (role == 'delete') {
      this.onboardingFormService.deleteCategoryFormGroup(data); // id
    }
  }

  handleCategoryAction(category) {
    const selCategory = {
      id: category.id,
      name: category.categoryName,
      type: category.categoryType,
      icon: category.icon
    }
    this.presentAddCategoryModal(selCategory);
  }

}
