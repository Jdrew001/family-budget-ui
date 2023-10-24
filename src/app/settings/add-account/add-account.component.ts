import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonAlert, IonModal } from '@ionic/angular';
import { IdName } from 'src/app/core/models/account.model';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent  implements OnInit {
  
  @ViewChild('modal') modalElement: IonModal = {} as IonModal;
  @ViewChild('accountTypeAlert') accountTypeAlert: IonAlert;
  @Output() dismissData$: EventEmitter<any> = new EventEmitter<any>();

  manageAccount: IdName = {} as IdName;
  public accountTypeButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => this.handleCancelAccountType()
    },
    {
      text: 'Confirm',
      handler: (data) => this.handleConfirmAccountType(data)
    }
  ];

  get accountTypeInputs() {
    return this.coreService.masterRefData?.accountTypes || [];
  }

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  get name() { return this.formGroup.get('name'); }
  get accountType() { return this.formGroup.get('type')?.value; }

  constructor(
    private coreService: CoreService
  ) { }

  ngOnInit() {}

  modalDidPresent(e) {
    console.log('Modal did present');
  }

  modalWillDismiss(e) {
    console.log('Modal will dismiss');
  }

  presentModal(data?: any) {
    this.manageAccount = data || {} as IdName;
    const selType = this.accountTypeInputs.find(o => o.id === this.manageAccount.typeId);
    this.formGroup.get('name').setValue(data?.name || '');
    this.formGroup.get('type').setValue(selType?.id || '');
    this.modalElement.present();
  }

  chooseType() {
    this.accountTypeAlert.inputs = this.accountTypeInputs.map(o => {
      return {
        type: 'radio',
        label: o.label,
        value: o.id,
        checked: o.id === this.accountType
      }
    });
    this.accountTypeAlert.present();
  }

  handleConfirmAccountType(data) {
    if (!data) {
      return false;
    }

    this.formGroup.get('type').setValue(data);
    return true;
  }

  handleCancelAccountType() {

  }

  getSelAccountTypeLabel(id: string) {
    return this.accountTypeInputs.find(o => o.id === id)?.label;
  }

  confirm() {
    const data = {
      id: this.manageAccount.id,
      name: this.name?.value,
      typeId: this.accountType
    } as IdName;
    this.dismissData$.emit(data);
  }
}
