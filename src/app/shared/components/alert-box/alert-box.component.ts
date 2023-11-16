import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertDialogType, AlertModal, AlertType } from './alert-box.model';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss'],
})
export class AlertBoxComponent  implements OnInit {

  @ViewChild('alertBox', { static: false }) alertBox: IonModal;
  @Output() onButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  public config: AlertModal;
  public alertDialogType = AlertDialogType;
  public alertType = AlertType;

  ngOnInit() {}

  openDialog(config: AlertModal) {
    this.config = config;
    this.alertBox.present();
  }

  dismissDialog(isConfirm: boolean) {
    this.onButtonClick.emit(isConfirm);
  }
}
