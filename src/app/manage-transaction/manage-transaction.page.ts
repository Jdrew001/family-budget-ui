import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { ManageTransactionService } from './services/manage-transaction.service';
import { ManageTransRefData, ManageTransaction } from './models/manage-transaction.model';
import { FormGroup } from '@angular/forms';
import { CategoryOverlayComponent } from './category-overlay/category-overlay.component';
import { SummaryAccountBalance } from '../core/models/account.model';
import { DateOverlayComponent } from '../shared/components/date-overlay/date-overlay.component';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.page.html',
  styleUrls: ['./manage-transaction.page.scss'],
})
export class ManageTransactionPage implements OnInit, ViewDidEnter {

  @ViewChild('categoryOverlay') categoryOverlay: CategoryOverlayComponent = {} as CategoryOverlayComponent;
  @ViewChild('dateOverlay') dateOverlay: DateOverlayComponent = {} as DateOverlayComponent;

  @Input('transactionId') transactionId: string = ''; 

  @Input('accounts') accounts: SummaryAccountBalance[] = [];
  showAccountOverlay = false;

  refData: ManageTransRefData = {} as ManageTransRefData;
  formGroup: FormGroup = this.manageTranService.manageTransactionForm;

  get accountFormControl() { return this.formGroup?.get('account'); }
  get selectedCategory() { return this.formGroup?.get('category'); }
  get selectedDate() { return this.formGroup?.get('date'); }
  get selId() { return this.formGroup?.get('id'); }

  constructor(
    private modalController: ModalController,
    private manageTranService: ManageTransactionService,
    private toastService: ToastService
  ) { }

  ionViewDidEnter(): void {
    if (this.transactionId) {
      console.log('transactionId', this.transactionId);
      this.manageTranService.getTransaction(this.transactionId)
        .subscribe((transaction: ManageTransaction) => {
          this.manageTranService.manageTransactionForm.setValue(transaction);
      });
    }
  }

  ngOnInit() {
    this.resetAccountActive();
    this.manageTranService.getRefData().subscribe((refData: ManageTransRefData) => {
      this.refData = refData;
    });
  }

  onAccountSelect(id: string) {
    this.resetAccountActive();
    if (this.accountFormControl?.value === id) {
      this.accountFormControl.setValue(null);
      const account = this.accounts.find(item => item.id === id) as SummaryAccountBalance;
      account.active = false;
      return;
    }
    this.accountFormControl?.setValue(id);
    const account = this.accounts.find(item => item.id === id) as SummaryAccountBalance;
    account.active = true;
  }

  onConfirm() {
    if (this.manageTranService.manageTransactionForm.invalid) {
      this.toastService.showMessage('Please fill in all required fields', true);
      return;
    }
    this.manageTranService.confirmTransaction(0);
    this.formGroup.reset();
  }

  chooseCategory() {
    this.categoryOverlay.presentModal();
  }

  chooseDate() {
    this.dateOverlay.presentModal();
  }

  closeTransaction() {
    this.modalController.dismiss();
    this.formGroup.reset();
  }

  onSelectCategory(value: any) {
    this.selectedCategory?.setValue(value);
  }

  onSelectDate(value: any) {
    this.formGroup.get('date')?.setValue(value);
  }

  getSelCategory() {
    return this.refData?.categories.find(category => category.id === this.selectedCategory?.value);
  }

  resetAccountActive() {
    this.accounts?.forEach(item => item.active = false)
  }
}
