import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ManageBudgetService } from './services/manage-budget.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { TransactionType } from '../core/models/transaction-type.model';
import { CoreService } from '../core/services/core.service';
import { ManageCategoryPage } from '../manage-category/manage-category.page';
import { loadingContentAnimation } from '../shared/animations/loading-animation';

@Component({
  selector: 'app-manage-budget',
  templateUrl: './manage-budget.page.html',
  styleUrls: ['./manage-budget.page.scss'],
  animations: [loadingContentAnimation]
})
export class ManageBudgetPage implements OnInit {

  @ViewChild('addCategoryModal') addCategoryOverlay: AddCategoryComponent;
  @ViewChild('manageCategory') manageCategory: ManageCategoryPage;

  @Input() budget: string; // budget id

  get manageBudgetSummary() { return this.manageBudgetService.manageBudgetSummary; }
  get manageBudgetCategories() { return this.manageBudgetService.manageBudgetCategories; }
  get pageInitialized() { return this.manageBudgetService.pageInitialized; }
  get budgetCategoryRefData() { return this.manageBudgetService.budgetCategoryRefData; }

  shouldRefreshScreen: boolean = false;

  placeHolderCategories = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  constructor(
    private modalController: ModalController,
    private manageBudgetService: ManageBudgetService
  ) { }

  ngOnInit() {
    this.shouldRefreshScreen = false;
    this.manageBudgetService.getAllData(this.budget);
  }

  closeBudget() {
    this.manageBudgetService.resetData();
    this.modalController.dismiss(this.shouldRefreshScreen);
  }

  addCategory() {
    this.addCategoryOverlay.presentModal();
  }

  openManageCategory(data) {
    this.manageCategory.presentModal(data);
  }

  onAddCategory() {
    this.manageBudgetService.addCategoryToBudget(this.budget).subscribe(data => {
      if (data) {
        this.manageBudgetService.pageInitialized = false;
        this.shouldRefreshScreen = true;
        this.manageBudgetService.getAllData(this.budget);
        this.addCategoryOverlay.dismissModal();
      }
    });
  }

  onSubmit(value: {id: string, amount: string}) {
    this.manageBudgetService.updateBudgetCategory(this.budget, value).subscribe(data => {
      if (data) {
        this.manageBudgetService.pageInitialized = false;
        this.shouldRefreshScreen = true;
        this.manageBudgetService.getAllData(this.budget);
        this.manageCategory.dismissModal();
      }
    });
  }

  onDelete(budgetCategoryid: string) {
    this.manageBudgetService.deleteBudgetCategory(budgetCategoryid).subscribe(data => {
      if (data) {
        this.manageBudgetService.pageInitialized = false;
        this.shouldRefreshScreen = true;
        this.manageBudgetService.getAllData(this.budget);
        this.manageCategory.dismissModal();
      }
    });
  }
}
