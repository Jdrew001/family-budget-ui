import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageBudgetPageRoutingModule } from './manage-budget-routing.module';

import { ManageBudgetPage } from './manage-budget.page';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageBudgetPageRoutingModule,
    SharedModule,
    CoreModule
  ],
  declarations: [ManageBudgetPage]
})
export class ManageBudgetPageModule {}
