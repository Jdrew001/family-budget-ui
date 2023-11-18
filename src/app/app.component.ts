import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './core/services/auth.service';
import { CoreService } from './core/services/core.service';
import { AlertControllerService } from './shared/services/alert-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storage: Storage,
    private platForm: Platform,
    private authService: AuthService,//
    private alertControllerService: AlertControllerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.platForm.ready().then(async (source) => {
      await this.storage.create();
      await this.authService.validateRefreshToken();
    });
  }
}
