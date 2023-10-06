import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { IonicModule } from '@ionic/angular';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CircleGaugeComponent } from './components/circle-gauge/circle-gauge.component';
import { SharedService } from './services/shared/shared.service';



@NgModule({
  declarations: [
    CardComponent,
    NavigationBarComponent,
    CircleGaugeComponent
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
    CircleGaugeComponent
  ]
})
export class SharedModule { }
