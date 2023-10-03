import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, IonModal, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { TransactionType } from 'src/app/core/models/transaction-type.model';
import { ManageBudgetService } from '../services/manage-budget.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent  implements OnInit, ViewDidEnter, ViewWillLeave {

  @ViewChild('modal') modalElement: IonModal;
  @ViewChild('scrollContainer') scrollContainer: IonGrid;

  _budgetCategoryRefData: Array<{id: string, name: string, type: TransactionType}> = [];
  @Input() set budgetCategoryRefData(value) { this._budgetCategoryRefData = value; }
  get budgetCategoryRefData() { return this._budgetCategoryRefData; }

  selectedCategoryType = null;
  selectedCategory: string;
  refDataClone: Array<{id: string, name: string, type: TransactionType}> = [];

  @Output() onConfirm$: EventEmitter<any> = new EventEmitter<any>();

  get formGroup() { return this.manageBudgetService.addCategoryForm; }

  constructor(
    private readonly manageBudgetService: ManageBudgetService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.modalElement.ionModalDidPresent.subscribe(async () => {
      (this.scrollContainer as any)['el'].ontouchmove = (e) => e.stopPropagation();
    });
  }

  ionViewWillLeave(): void {
    this.selectedCategoryType = null;
    this.selectedCategory = null;
    this.refDataClone = null;
    this.formGroup.reset();
  }

  presentModal() {
    console.log('testing', this.budgetCategoryRefData)
    this.refDataClone = this.budgetCategoryRefData;
    this.modalElement.present();
  }

  categoryTypeSelected(type: TransactionType) {
    this.refDataClone = this.budgetCategoryRefData;
    this.selectedCategory = null;
    if (this.selectedCategoryType == type) {
      this.selectedCategoryType = null;
      return;
    }
    this.selectedCategoryType = type;
    this.refDataClone = this.budgetCategoryRefData.filter(category => category.type == type);
  }

  selectCategory(id: string) {
    if (this.selectedCategory == id) {
      this.selectedCategory = null;
      this.formGroup.get('id').setValue(this.selectCategory);
      return;
    }

    this.selectedCategory = id;
    this.formGroup.get('id').setValue(this.selectedCategory);
  }

  onConfirm() {
    if (this.formGroup.invalid) {
      return;
    }

    this.onConfirm$.emit();
  }

  dismissModal() {
    this.modalElement.dismiss();
  }

}
