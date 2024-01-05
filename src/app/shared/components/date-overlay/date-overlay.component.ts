import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-date-overlay',
  templateUrl: './date-overlay.component.html',
  styleUrls: ['./date-overlay.component.scss'],
})
export class DateOverlayComponent  implements OnInit {

  selectedDate: String = new Date().toISOString();
  @ViewChild('modal') modalElement: IonModal = {} as IonModal;
  @Input() title: string = '';
  @Input() minDate: string = null;
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  presentModal(date?: Date) {
    const nDate = moment().toDate();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('date', date);

    if (date) {
        // If date is provided, convert it to the user's timezone
        console.log('Date:', date);
        this.selectedDate = moment(date).format('YYYY-MM-DDTHH:mm');
    } else {
        // If date is not provided, use the current time in the user's timezone
        this.selectedDate = moment.tz(nDate, userTimeZone).format('YYYY-MM-DDTHH:mm');//
    }

    console.log('Selected date:', this.selectedDate); // Log the selected date

    this.modalElement.present();
  }

  onConfirmDate() {
    this.onConfirm.emit(this.selectedDate);
    this.modalElement.dismiss();
  }

  onDateSelected(event: any) {
    this.selectedDate = event?.detail?.value;
  }

}
