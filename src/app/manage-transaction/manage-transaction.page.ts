import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonGrid, IonModal, ModalController, NavController, ViewDidEnter } from '@ionic/angular';
import { UserService } from '../core/services/user/user.service';
import { ManageTransactionService } from './services/manage-transaction.service';
import { ManageTransRefData, TransactionAction, TransactionType } from './models/manage-transaction.model';
import { FormGroup } from '@angular/forms';
import { SummaryAccountBalance } from '../summary/model/summary.model';
import { CategoryOverlayComponent } from './category-overlay/category-overlay.component';
import { DateOverlayComponent } from './date-overlay/date-overlay.component';

@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.page.html',
  styleUrls: ['./manage-transaction.page.scss'],
})
export class ManageTransactionPage implements OnInit, ViewDidEnter {

  @ViewChild('categoryOverlay') categoryOverlay: CategoryOverlayComponent;
  @ViewChild('dateOverlay') dateOverlay: DateOverlayComponent;

  accounts: SummaryAccountBalance[];
  showAccountOverlay = false;

  refData: ManageTransRefData;
  formGroup: FormGroup = this.manageTranService.manageTransactionForm;

  get accountFormControl() { return this.formGroup?.get('account'); }
  get selectedCategory() { return this.formGroup?.get('category'); }
  get selectedDate() { return this.formGroup?.get('date'); }

  constructor(
    private modalController: ModalController,
    private manageTranService: ManageTransactionService,
  ) { }

  ionViewDidEnter(): void {
    
  }

  ngOnInit() {
    this.resetAccountActive();
    this.manageTranService.getRefData().subscribe((refData: ManageTransRefData) => {
      this.refData = refData;
    });
  }

  onAccountSelect(id: string) {
    this.resetAccountActive();
    if (this.accountFormControl.value === id) {
      this.accountFormControl.setValue(null);
      this.accounts.find(item => item.id === id).active = false;
      return;
    }
    this.accountFormControl.setValue(id);
    this.accounts.find(item => item.id === id).active = true;
  }

  onConfirm() {
    if (this.manageTranService.manageTransactionForm.invalid) {
      console.log('invalid form');
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

  onSelectCategory(value) {
    this.selectedCategory.setValue(value);
  }

  onSelectDate(value) {
    this.formGroup.get('date').setValue(value);
  }

  getSelCategory() {
    return this.refData?.categories.find(category => category.id === this.selectedCategory.value);
  }

  resetAccountActive() {
    this.accounts?.forEach(item => item.active = false)
  }
}
