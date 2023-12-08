import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { IonicModule } from '@ionic/angular';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CircleGaugeComponent } from './components/circle-gauge/circle-gauge.component';
import { SharedService } from './services/shared/shared.service';
import { ReportGridComponent } from './components/report-grid/report-grid.component';
import { DateOverlayComponent } from './components/date-overlay/date-overlay.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { AlertControllerService } from './services/alert-controller.service';
import { IconFieldComponent } from './components/icon-field/icon-field.component';
import { CategoryTypePipe } from './pipes/category-type.pipe';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { AddFamilyComponent } from './components/add-family/add-family.component';
import { AddCategoryComponent as AddCategoryComponentSettings } from '../shared/components/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyPlaceholderComponent } from './components/empty-placeholder/empty-placeholder.component';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';
import { PhoneMaskDirective } from './directives/phone-mask.directive';



@NgModule({
  declarations: [
    CardComponent,
    NavigationBarComponent,
    CircleGaugeComponent,
    ReportGridComponent,
    DateOverlayComponent,
    AlertBoxComponent,
    IconFieldComponent,
    CategoryTypePipe,
    AddAccountComponent,
    AddFamilyComponent,
    AddCategoryComponentSettings,
    EmptyPlaceholderComponent,
    CurrencyMaskDirective,
    PhoneMaskDirective
  ],
  providers: [
    SharedService,
    AlertControllerService
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CardComponent,
    NavigationBarComponent,
    CircleGaugeComponent,
    ReportGridComponent,
    DateOverlayComponent,
    AlertBoxComponent,
    IconFieldComponent,
    CategoryTypePipe,
    AddAccountComponent,
    AddFamilyComponent,
    AddCategoryComponentSettings,
    EmptyPlaceholderComponent,
    CurrencyMaskDirective,
    PhoneMaskDirective
  ]
})
export class SharedModule { }
