import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { IonicModule } from '@ionic/angular';
import { AccountService } from './services/account/account.service';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';



@NgModule({
  declarations: [
    CardComponent,
    NavigationBarComponent
  ],
  providers: [
    AccountService
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardComponent,
    NavigationBarComponent
  ]
})
export class SharedModule { }
