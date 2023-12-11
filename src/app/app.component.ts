import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './core/services/auth.service';
import { CoreService } from './core/services/core.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storage: Storage,
    private platForm: Platform,
    private authService: AuthService,
    private navController: NavController,
    private coreService: CoreService,
  ) {}
//
  async ngOnInit(): Promise<void> {
    this.platForm.ready().then(async (source) => {
      await SplashScreen.show(
        {
          autoHide: false
        }
      );
      from(this.storage.create()).subscribe(async (result) => {
        await this.authService.validateRefreshToken();
      })
    });
  }
}
