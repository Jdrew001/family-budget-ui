import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ManageBudgetService } from './services/manage-budget.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { TransactionType } from '../core/models/transaction-type.model';

@Component({
  selector: 'app-manage-budget',
  templateUrl: './manage-budget.page.html',
  styleUrls: ['./manage-budget.page.scss'],
})
export class ManageBudgetPage implements OnInit {

  @ViewChild('addCategoryModal') addCategoryOverlay: AddCategoryComponent

  @Input() budget: any;

  get manageBudgetSummary() { return this.manageBudgetService.manageBudgetSummary; }
  get manageBudgetCategories() { return this.manageBudgetService.manageBudgetCategories; }

  budgetCategoryRefData: Array<{id: string, name: string, type: TransactionType}> = [];

  constructor(
    private modalController: ModalController,
    private manageBudgetService: ManageBudgetService
  ) { }

  ngOnInit() {
    this.manageBudgetService.getAllData(this.budget);  
    this.manageBudgetService.getBudgetCategoryRefData(this.budget).subscribe(data => {
      this.budgetCategoryRefData = data;
    });
  }

  closeBudget() {
    this.modalController.dismiss();
  }

  addCategory() {
    this.addCategoryOverlay.presentModal();
  }

  onAddCategory() {
    this.manageBudgetService.addCategoryToBudget(this.budget).subscribe(data => {
      if (data) {
        this.manageBudgetService.getAllData(this.budget);
        this.addCategoryOverlay.dismissModal();
      }
    });
  }
}
