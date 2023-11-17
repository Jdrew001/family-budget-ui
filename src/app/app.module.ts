import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { register } from 'swiper/element/bundle';
import { CoreModule } from './core/core.module';
import { SigninPageModule } from './auth/signin/signin.module';
import { SignupPageModule } from './auth/signup/signup.module';
import { SharedModule } from './shared/shared.module';

register();

@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicModule.forRoot(),
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SigninPageModule,
    SignupPageModule,
    SharedModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
