import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { IonicModule } from '@ionic/angular';
import { AccountService } from './services/account/account.service';



@NgModule({
  declarations: [
    CardComponent
  ],
  providers: [
    AccountService
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardComponent
  ]
})
export class SharedModule { }
