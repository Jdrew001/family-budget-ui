import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storage: Storage,
    private platForm: Platform,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.platForm.ready().then(async (source) => {
      await this.storage.create();//
      await this.authService.validateRefreshToken();
    });
  }
}
