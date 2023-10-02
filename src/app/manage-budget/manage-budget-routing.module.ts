import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageBudgetPage } from './manage-budget.page';

const routes: Routes = [
  {
    path: '',
    component: ManageBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageBudgetPageRoutingModule {}
