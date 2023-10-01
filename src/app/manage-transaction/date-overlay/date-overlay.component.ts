import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-date-overlay',
  templateUrl: './date-overlay.component.html',
  styleUrls: ['./date-overlay.component.scss'],
})
export class DateOverlayComponent  implements OnInit {

  selectedDate = new Date();
  @ViewChild('modal') modalElement: IonModal;
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  presentModal() {
    this.modalElement.present();
  }

  onConfirmDate() {
    this.onConfirm.emit(this.selectedDate);
    this.modalElement.dismiss();
  }

  onDateSelected(event) {
    this.selectedDate = event?.detail?.value;
  }

}
