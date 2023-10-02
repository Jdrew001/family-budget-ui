import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { ManageTransactionConstant } from '../manage-transaction.constant';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionAction } from '../models/manage-transaction.model';
import { catchError } from 'rxjs';
import { error } from 'console';
import { HandleErrorHelper } from 'src/app/core/helpers/handle-error';
import { ModalController, NavController } from '@ionic/angular';
import { CoreService } from 'src/app/core/services/core.service';

@Injectable({
  providedIn: 'root'
})
export class ManageTransactionService extends BaseService {

  get manageTransactionForm(): FormGroup {return this.formGroup; }
  private formGroup: FormGroup = new FormGroup({
    account: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    amount: new FormControl('$0.00', Validators.required),
    date: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private coreService: CoreService
  ) {
    super();
  }

  confirmTransaction(action: TransactionAction) {
    const url = `${this.BASE_URL}${ManageTransactionConstant.CONFIRM_TRANSACTION}`;
    const body = {
      data: this.manageTransactionForm.getRawValue(),
      action: action
    }
    return this.http.post(url, body).pipe(
      catchError((error) => HandleErrorHelper.handleError(error))
    ).subscribe((result: any) => {
      if (!result.success) {
        //handle error
        return;
      }
      //this.navController.navigateBack('/tabs/summary', { animated: true, queryParams: { refresh: true } });
      this.modalController.dismiss({refresh: true});
      this.coreService.$shouldRefreshScreen.next(true);
    });
  }

  getRefData() {
    const url = `${this.BASE_URL}${ManageTransactionConstant.REF_DATA}`;
    return this.http.get(url);
  }
}
