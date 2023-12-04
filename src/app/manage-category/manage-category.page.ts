import { Component, OnInit, ViewChild } from '@angular/core';
import { IonGrid, IonModal } from '@ionic/angular';
import { CategoriesForBudget } from '../core/models/left-spending.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.page.html',
  styleUrls: ['./manage-category.page.scss'],
})
export class ManageCategoryPage implements OnInit {

  @ViewChild('modal') modalElement: IonModal;
  @ViewChild('scrollContainer') scrollContainer: IonGrid;

  private _categoryForBudget: CategoriesForBudget;
  get categoryForBudget() { return this._categoryForBudget; }
  set categoryForBudget(value) { this._categoryForBudget = value; }

  formGroup = new FormGroup({
    amount: new FormControl('$0.00', Validators.required)
  });

  constructor() { }

  ngOnInit() {
  }

  presentModal(data: CategoriesForBudget) {
    this.formGroup.get('amount').setValue(`$${data.budgetAmount.toFixed(2)}`);
    this.modalElement.present();
    this.categoryForBudget = data;
  }

  dismissModal() {
    this.modalElement.dismiss();
  }
}
