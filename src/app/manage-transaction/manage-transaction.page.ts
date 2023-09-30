import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonGrid, IonModal, ModalController, NavController, ViewDidEnter } from '@ionic/angular';
import { UserService } from '../core/services/user/user.service';
import { ManageTransactionService } from './services/manage-transaction.service';
import { ManageTransRefData, TransactionAction } from './models/manage-transaction.model';
import { FormGroup } from '@angular/forms';
import { SummaryAccountBalance } from '../summary/model/summary.model';

@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.page.html',
  styleUrls: ['./manage-transaction.page.scss'],
})
export class ManageTransactionPage implements OnInit, ViewDidEnter {

  @ViewChild('modal') modalElement: IonModal;
  @ViewChild('ionContent') ionContent: IonContent;
  @ViewChild('scrollContainer') scrollContainer: IonGrid;

  accounts: SummaryAccountBalance[];

  refData: ManageTransRefData;
  formGroup: FormGroup = this.manageTranService.manageTransactionForm;

  constructor(
    private modalController: ModalController,
    private manageTranService: ManageTransactionService,
  ) { }

  ionViewDidEnter(): void {
    //console.log('modal el', this.modalElement)
    //this.modalElement.nativeElement.ontouchmove = (e) => e.stopPropagation();
    this.modalElement.ionModalDidPresent.subscribe(async () => {
      (this.scrollContainer as any)['el'].ontouchmove = (e) => e.stopPropagation();
      (this.ionContent as any)['el'].style['--offset-bottom'] = '-15vh';
    });
  }

  ngOnInit() {
    this.manageTranService.getRefData().subscribe((refData: ManageTransRefData) => this.refData = refData);
  }

  onConfirm() {
    if (this.manageTranService.manageTransactionForm.invalid) {
      console.log('invalid form');
      return;
    }
    this.manageTranService.confirmTransaction(0);
  }

  chooseCategory() {
    this.modalElement.present();
    
  }

  closeTransaction() {
    this.modalController.dismiss();
  }

  onConfirmCategories() {
    this.modalElement.dismiss();
  }
}
