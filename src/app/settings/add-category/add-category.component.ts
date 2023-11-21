import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/core/services/core.service';
import { IconFieldComponent } from 'src/app/shared/components/icon-field/icon-field.component';

@Component({
  selector: 'app-add-category-settings',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent  implements OnInit {

  @ViewChild('iconField') iconField: IconFieldComponent;

  formGroup: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    categoryType: new FormControl(-1, Validators.required),
    icon: new FormControl('', Validators.required)
  })

  get categoryName() { return this.formGroup.get('categoryName'); }
  get categoryType() { return this.formGroup.get('categoryType').value; }
  get icon() { return this.formGroup.get('icon'); }

  constructor(
    private modalController: ModalController,
    private coreService: CoreService
  ) { }

  ngOnInit() {}

  categoryTypeSelected(type: number) {
    this.formGroup.get('categoryType').setValue(type);
  }

  presentModal(data?: any) {

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

  getSelectedIcon(icon) {
    
  }

}
