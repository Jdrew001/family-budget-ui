import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { SignupService } from './services/signup.service';
import { SignupFormService } from './services/signup-form.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPageRoutingModule
  ],
  declarations: [SignupPage],
  providers: [
    SignupFormService,
    SignupService
  ]
})
export class SignupPageModule {}
