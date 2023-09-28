import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreService } from './services/core.service';
import { ToastService } from './services/toast.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { UserService } from './services/user/user.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    CoreService,
    ToastService,
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
