import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTransactionPageRoutingModule } from './manage-transaction-routing.module';

import { ManageTransactionPage } from './manage-transaction.page';
import { CoreModule } from '../core/core.module';
import { ManageTransactionService } from './services/manage-transaction.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ManageTransactionPageRoutingModule,
    CoreModule
  ],
  providers: [
    ManageTransactionService
  ],
  declarations: [ManageTransactionPage]
})
export class ManageTransactionPageModule {}
