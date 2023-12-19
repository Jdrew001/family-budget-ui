import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, IonModal } from '@ionic/angular';
import { CategoriesForBudget } from '../core/models/left-spending.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.page.html',
  styleUrls: ['./manage-category.page.scss'],
})
export class ManageCategoryPage implements OnInit {

  @ViewChild('modal') modalElement: IonModal;
  @ViewChild('scrollContainer') scrollContainer: IonGrid;

  @Output() onSubmit$ = new EventEmitter<{id: string, amount: string}>();
  @Output() onDelete$ = new EventEmitter<string>();

  private _categoryForBudget: CategoriesForBudget;
  get categoryForBudget() { return this._categoryForBudget; }
  set categoryForBudget(value) { this._categoryForBudget = value; }

  formGroup = new FormGroup({
    amount: new FormControl('$0.00', Validators.required)
  });

  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  presentModal(data: CategoriesForBudget) {
    this.formGroup.get('amount').setValue(`$${data.budgetAmount.toFixed(2)}`);
    this.modalElement.present();
    this.categoryForBudget = data;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.toastService.showMessage('Please enter a valid amount');
      return;
    }

    this.onSubmit$.emit({
      id: this.categoryForBudget.id, // budget category id
      amount: this.formGroup.get('amount').value
    });
  }

  onDelete() {
    this.onDelete$.emit(this.categoryForBudget.id); // budget category id
  }

  dismissModal() {
    this.modalElement.dismiss();
  }
}
