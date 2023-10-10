import { Component, OnInit, ViewChild } from '@angular/core';
import { IonGrid, IonModal } from '@ionic/angular';
import { CategoriesForBudget } from '../core/models/left-spending.model';

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

  constructor() { }

  ngOnInit() {
  }

  presentModal(data: CategoriesForBudget) {
    this.modalElement.present();
    this.categoryForBudget = data;

    
  }

  modalWillDismiss(e): void {

  }

  dismissModal() {
    this.modalElement.dismiss();
  }
}
