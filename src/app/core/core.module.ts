import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreService } from './services/core.service';
import { ToastService } from './services/toast.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CoreService,
    ToastService
  ]
})
export class CoreModule { }
