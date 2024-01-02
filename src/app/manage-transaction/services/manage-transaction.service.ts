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
import { ToastService } from 'src/app/core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ManageTransactionService {

  get manageTransactionForm(): FormGroup {return this.formGroup; }
  get transactionId(): string { return this.formGroup?.get('id')?.value; }
  private formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    account: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    amount: new FormControl('$0.00', Validators.required),
    date: new FormControl('', Validators.required),
  });

  private _pageInitialized = false;
  get pageInitialized() { return this._pageInitialized; }
  set pageInitialized(value: boolean) { this._pageInitialized = value; }

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private coreService: CoreService,
    private helperService: HelperService,
    private toastService: ToastService
  ) {
  }

  getTransaction(id: string) {
    const url = this.helperService.getResourceUrl(ManageTransactionConstant.GET_TRANSACTION);
    return this.http.get(`${url}/${id}`) as Observable<ManageTransaction>;
  }

  confirmTransaction() {
    const url = this.helperService.getResourceUrl(ManageTransactionConstant.CONFIRM_TRANSACTION);
    const body = {
      data: this.manageTransactionForm.getRawValue(),
      action: this.transactionId ? TransactionAction.Edit : TransactionAction.Add
    }
    return this.http.post(url, body).pipe(
      catchError((error) => HandleErrorHelper.handleError(error))
    ).subscribe((result: any) => {
      if (!result.success) {
        this.toastService.showMessage(result.message, true);
        return;
      }

      this.coreService.$shouldRefreshScreen.next(true);
      setTimeout(() => {this.modalController.dismiss({refresh: true});}, 200);
    });
  }

  deleteTransaction(id: string) {
    const url = this.helperService.getResourceUrl(ManageTransactionConstant.DELETE_TRANSACTION);
    this.http.get(`${url}/${id}`).subscribe((result: any) => {
      if (!result.success) {
        this.toastService.showMessage(result.message, true);
        return;
      }
      
      this.coreService.$shouldRefreshScreen.next(true);
      this.modalController.dismiss({refresh: true});
    });
  }

  getRefData() {
    const url = this.helperService.getResourceUrl(ManageTransactionConstant.REF_DATA);
    return this.http.get(url) as Observable<any>;
  }
}
