import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { SummaryPage } from '../summary/summary.page';
import { ManageTransactionPage } from '../manage-transaction/manage-transaction.page';
import { TransactionPage } from '../transaction/transaction.page';
import { BudgetPage } from '../budget/budget.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'summary',
        component: SummaryPage
      },
      {
        path: 'transaction',
        component: TransactionPage
      },
      {
        path: 'budget',
        component: BudgetPage
      },
      {
        path: '',
        redirectTo: '/tabs/summary',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
