import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryPageRoutingModule } from './summary-routing.module';

import { SummaryPage } from './summary.page';
import { SummaryService } from './summary.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [SummaryPage],
  providers: [
    SummaryService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SummaryPageModule {}
