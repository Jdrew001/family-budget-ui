import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlertModal } from '../components/alert-box/alert-box.model';
import { ActionStrategyMapping } from 'src/app/core/constants/alert-key.constants';

@Injectable({
  providedIn: 'root'
})
export class AlertControllerService {

  alertBoxSubject$: Subject<{config: AlertModal, show: boolean}> = new Subject();

  constructor() {
    
  }

  handleAlertAction(payload: {action: string, data: any}) {
    if (!!payload.action) {
      try {
        const actionHandler = new ActionStrategyMapping[payload.action](this);
        actionHandler.execute(payload.data);
      } catch (error) {
        console.log('action handler err', error);
      }
    }
  }

  closeAlertBox() {
    this.alertBoxSubject$.next({config: null, show: false});
  }

  openAlertBox(config: AlertModal) {
    this.alertBoxSubject$.next({config, show: true});
  }
}
