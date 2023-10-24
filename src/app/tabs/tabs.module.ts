import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ManageTransactionPage } from '../manage-transaction/manage-transaction.page';
import { ManageTransactionService } from '../manage-transaction/services/manage-transaction.service';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SummaryPage } from '../summary/summary.page';
import { SharedModule } from '../shared/shared.module';
import { SummaryService } from '../summary/summary.service';
import { CategoryOverlayComponent } from '../manage-transaction/category-overlay/category-overlay.component';
import { DateOverlayComponent } from '../manage-transaction/date-overlay/date-overlay.component';
import { AddCategoryComponent } from '../manage-budget/add-category/add-category.component';
import { ManageBudgetPage } from '../manage-budget/manage-budget.page';
import { ManageBudgetService } from '../manage-budget/services/manage-budget.service';
import { TransactionPage } from '../transaction/transaction.page';
import { TransactionService } from '../transaction/transaction.service';
import { BudgetPage } from '../budget/budget.page';
import { BudgetService } from '../budget/budget.service';
import { ManageCategoryPage } from '../manage-category/manage-category.page';
import { SettingsPage } from '../settings/settings.page';
import { AddAccountComponent } from '../settings/add-account/add-account.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TabsPageRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
  ],
  declarations: [
    TabsPage,
    ManageTransactionPage,
    ManageBudgetPage,
    SummaryPage,
    TransactionPage,
    BudgetPage,
    CategoryOverlayComponent,
    DateOverlayComponent,
    AddCategoryComponent,
    ManageCategoryPage,
    SettingsPage,
    AddAccountComponent
  ],
  providers: [
    ManageTransactionService,
    ManageBudgetService,
    SummaryService,
    TransactionService,
    BudgetService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsPageModule {}
