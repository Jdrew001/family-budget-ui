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

@NgModule({
  declarations: [
    AppComponent, 
    OnboardingPage, 
    ProfileComponent, 
    AccountComponent,
    CategoriesComponent,
    InviteFamilyComponent
  ],
  imports: [
    IonicModule.forRoot(),
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SigninPageModule,
    SignupPageModule,
    SharedModule,
    TabsPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
