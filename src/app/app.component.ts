import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './core/services/auth.service';
import { CoreService } from './core/services/core.service';
import { Keyboard } from '@capacitor/keyboard';
import { from } from 'rxjs';
import { App } from '@capacitor/app';

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
      await Keyboard.setAccessoryBarVisible({isVisible: true});
      let appInfo = await App.getInfo();
      this.coreService.appVersion = `${appInfo.version} (${appInfo.build})`;
      // await SplashScreen.show(
      //   {
      //     autoHide: false
      //   }
      // );
      from(this.storage.create()).subscribe(async (result) => {
        await this.authService.validateRefreshToken();
      })
    });
  }
}
