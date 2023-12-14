import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { ManageTransactionConstant } from '../manage-transaction.constant';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageTransaction, TransactionAction } from '../models/manage-transaction.model';
import { Observable, catchError } from 'rxjs';
import { error } from 'console';
import { HandleErrorHelper } from 'src/app/core/helpers/handle-error';
import { ModalController, NavController } from '@ionic/angular';
import { CoreService } from 'src/app/core/services/core.service';
import { HelperService } from 'src/app/core/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ManageTransactionService {

  get manageTransactionForm(): FormGroup {return this.formGroup; }
  private formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    account: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    amount: new FormControl('$0.00', Validators.required),
    date: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private coreService: CoreService,
    private helperService: HelperService
  ) {
  }

  getTransaction(id: string) {
    const url = this.helperService.getResourceUrl(ManageTransactionConstant.GET_TRANSACTION);
    return this.http.get(`${url}/${id}`) as Observable<ManageTransaction>;
  }

  confirmTransaction(action: TransactionAction) {
    const url = this.helperService.getResourceUrl(ManageTransactionConstant.CONFIRM_TRANSACTION);
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
    const url = this.helperService.getResourceUrl(ManageTransactionConstant.REF_DATA);
    return this.http.get(url) as Observable<any>;
  }
}
