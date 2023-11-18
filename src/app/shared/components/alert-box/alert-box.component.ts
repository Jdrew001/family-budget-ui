import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertDialogType, AlertModal, AlertType } from './alert-box.model';
import { IonModal } from '@ionic/angular';
import { AlertControllerService } from '../../services/alert-controller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss'],
})
export class AlertBoxComponent  implements OnInit {

  @ViewChild('alertBox', { static: false }) alertBox: IonModal;

  public config: AlertModal;
  public alertDialogType = AlertDialogType;
  public alertType = AlertType;

  private subscription: Subscription;

  constructor(
    private alertControllerService: AlertControllerService
  ) {}

  ngOnInit() {
    if (!this.subscription) {
      this.subscription = this.alertControllerService.alertBoxSubject$.subscribe(data => {
        if (data.show) {
          this.openDialog(data.config);
        } else {
          this.closeDialog(data.config);
        }
    });
    }
  }

  private openDialog(config: AlertModal) {
    this.config = config;
    this.alertBox.present();
  }

  closeDialog(config: AlertModal) {
    this.alertBox.dismiss();
    this.config = config;
  }

  dismissDialog(isConfirm: boolean) {
    const payload = isConfirm ? {action: this.config?.key, data: this.config?.data}: null;
    this.alertControllerService.handleAlertAction(payload);
    setTimeout(() => {this.alertControllerService.closeAlertBox()}, 100);
  }
}
