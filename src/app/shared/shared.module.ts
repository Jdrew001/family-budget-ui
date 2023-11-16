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



@NgModule({
  declarations: [
    CardComponent,
    NavigationBarComponent,
    CircleGaugeComponent,
    ReportGridComponent,
    DateOverlayComponent,
    AlertBoxComponent
  ],
  providers: [
    SharedService
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardComponent,
    NavigationBarComponent,
    CircleGaugeComponent,
    ReportGridComponent,
    DateOverlayComponent,
    AlertBoxComponent
  ]
})
export class SharedModule { }
