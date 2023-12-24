import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, IonModal, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { TransactionType } from 'src/app/core/models/transaction-type.model';
import { ManageBudgetService } from '../services/manage-budget.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent  implements OnInit {

  @ViewChild('modal') modalElement: IonModal;
  @ViewChild('scrollContainer') scrollContainer: IonGrid;
  get budgetCategoryRefData() { return this.manageBudgetService.budgetCategoryRefData; }

  screen = 0;

  selectedCategoryType = null;
  selectedCategory: string;

  @Output() onConfirm$: EventEmitter<any> = new EventEmitter<any>();

  get formGroup() { return this.manageBudgetService.addCategoryForm; }

  constructor(
    private readonly manageBudgetService: ManageBudgetService
  ) { }

  ngOnInit() {
  }

  modalDidPresent(e) {
    (this.scrollContainer as any)['el'].ontouchmove = (e) => {e.stopPropagation(); console.log('hello')};
  }

  modalWillDismiss(e): void {
    this.selectedCategoryType = null;
    this.selectedCategory = null;
    this.formGroup.get('amount').setValue('');
    this.formGroup.get('id').setValue('');
    this.screen = 0;
  }

  presentModal() {
    this.modalElement.present();
  }

  categoryTypeSelected(type: TransactionType) {
    this.selectedCategory = null;
    if (this.selectedCategoryType == type) {
      this.selectedCategoryType = null;
      return;
    }
    this.selectedCategoryType = type;
  }

  selectCategory(id: string) {
    this.selectedCategory = id;
    this.formGroup.get('id').setValue(this.selectedCategory);
    this.screen = 1;
  }

  onConfirm() {
    if (this.formGroup.invalid) {
      return;
    }

    this.onConfirm$.emit();
  }

  onDelete() {
    
  }

  dismissModal() {
    this.modalElement.dismiss();
  }

  getCategoryItem() {
    return this.budgetCategoryRefData.find(category => category.id == this.selectedCategory);
  }

}
