import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/core/services/core.service';
import { IconFieldComponent } from 'src/app/shared/components/icon-field/icon-field.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { CoreConstants } from 'src/app/core/constants/core.constants';
import { CategoryType } from 'src/app/settings/models/settings.model';
import { SettingsService } from 'src/app/settings/settings.service';

@Component({
  selector: 'app-add-category-settings',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent  implements OnInit {

  @ViewChild('iconField') iconField: IconFieldComponent;
  @Input() set category(value: {id: string, name: string, type: CategoryType, icon: string}) {
    if (value) {
      this.categoryName.setValue(value.name);
      this.formGroup.get('categoryType').setValue(value.type);
      this.icon.setValue(value.icon);
      this.categoryId.setValue(value.id);
    }
  }

  @Output() categoryCreated$: EventEmitter<any> = new EventEmitter<any>();

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    categoryName: new FormControl('', Validators.required),
    categoryType: new FormControl(null, Validators.required),
    icon: new FormControl('', Validators.required)
  })

  get categoryId() { return this.formGroup.get('id'); }

  get categoryName() { return this.formGroup.get('categoryName'); }
  get categoryType() { return this.formGroup.get('categoryType').value; }
  get icon() { return this.formGroup.get('icon'); }

  constructor(
    private modalController: ModalController,
    private toastService: ToastService
  ) { }

  ngOnInit() {}

  categoryTypeSelected(type: number) {
    this.formGroup.get('categoryType').setValue(type);
  }

  closeCategoryPopup() {
    this.modalController.dismiss();
  }

  chooseIcon() {
    this.iconField.presentModal();
  }

  onIconSelected(icon: string) {
    this.formGroup.get('icon').setValue(icon);
  }

  getSelectedCategory(type: number) {
    return type == 0 ? 'Income' : 'Expense';
  }

  confirmCategory() {
    if (this.formGroup.invalid) {
      this.toastService.showMessage(CoreConstants.FORM_ERROR_MSG, true);
      return;
    }

    this.modalController.dismiss(this.formGroup.value, 'confirm');
  }

}