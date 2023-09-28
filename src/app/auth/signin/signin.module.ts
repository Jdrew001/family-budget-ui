import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';

import { SigninPage } from './signin.page';
import { SigninFormService } from './services/signin-form.service';
import { SigninService } from './services/signin.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SigninPageRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  declarations: [SigninPage],
  providers: [
    SigninFormService,
    SigninService
  ]
})
export class SigninPageModule {}
