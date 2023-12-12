import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SigninPageModule } from './auth/signin/signin.module';
import { SignupPageModule } from './auth/signup/signup.module';
import { SharedModule } from './shared/shared.module';
import { TabsPageModule } from './tabs/tabs.module';
import { OnboardingPage } from './onboarding/onboarding.page';
import { ProfileComponent } from './onboarding/profile/profile.component';
import { AccountComponent } from './onboarding/account/account.component';
import { CategoriesComponent } from './onboarding/categories/categories.component';
import { InviteFamilyComponent } from './onboarding/invite-family/invite-family.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreService } from './core/services/core.service';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [
    AppComponent, 
    OnboardingPage, 
    ProfileComponent, 
    AccountComponent,
    CategoriesComponent,
    InviteFamilyComponent,
  ],
  imports: [
    IonicModule.forRoot({
      mode: 'ios'//
    }),
    CoreModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SigninPageModule,
    SignupPageModule,
    SharedModule,
    TabsPageModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CoreService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
