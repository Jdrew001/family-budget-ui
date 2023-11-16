import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlertModal } from '../components/alert-box/alert-box.model';

@Injectable({
  providedIn: 'root'
})
export class AlertControllerService {

  alertBoxSubject$: Subject<{config: AlertModal, show: boolean}> = new Subject();

  constructor() {
    
  }

  closeAlertBox() {
    this.alertBoxSubject$.next({config: null, show: false});
  }

  openAlertBox(config: AlertModal) {
    this.alertBoxSubject$.next({config, show: true});
  }
}
