import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonAlert, IonModal, ModalController } from '@ionic/angular';
import { IdName } from 'src/app/core/models/account.model';
import { CoreService } from 'src/app/core/services/core.service';
import { SettingsService } from '../settings.service';
import { AccountModel } from '../models/settings.model';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent  implements OnInit {
  
  @ViewChild('accountTypeAlert') accountTypeAlert: IonAlert;
  @ViewChild('frequencyAlert') frequencyAlert: IonAlert;

  _account: any;
  @Input() set account(value) {
    if (value) {
      this._account = value;
      this.presentModal(value);
    }
  }
  @Output() dismissData$: EventEmitter<any> = new EventEmitter<any>();

  manageAccount: IdName = {} as IdName;
  shouldDisable: boolean = false;

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

  public frequencyButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => this.handleCancelFrequency()
    },
    {
      text: 'Confirm',
      handler: (data) => this.handleConfirmFrequency(data)
    }
  ];

  get accountTypeInputs() {
    return this.coreService.masterRefData?.accountTypes || [];
  }

  formGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    icon: new FormControl(''),
    accountType: new FormControl('', Validators.required),
    createBudget: new FormControl(false),
    frequency: new FormControl(null) // condtionally required based on createBudget
  });

  get accountId() { return this.formGroup.get('id'); }
  get name() { return this.formGroup.get('name'); }
  get accountType() { return this.formGroup.get('accountType')?.value; }
  get createBudget() { return this.formGroup.get('createBudget')?.value; }
  get frequencies() { return this.coreService.masterRefData?.frequencies || []; }
  get selFrequency() { return this.formGroup.get('frequency')?.value; }

  constructor(
    private coreService: CoreService,
    private modalController: ModalController,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {}

  modalDidPresent(e) {
    console.log('Modal did present');
  }

  modalWillDismiss(e) {
    console.log('Modal will dismiss');
  }

  presentModal(data?: any) {
    if (!data?.id) return;
    this.settingsService.getAccountById(data?.id).subscribe((result: AccountModel) => {
      this.shouldDisable = result.shouldDisable;
      this.formGroup.setValue(result);
    }); 
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

  chooseFrequency() {
    this.frequencyAlert.inputs = this.frequencies.map(o => {
      return {
        type: 'radio',
        label: o.label,
        value: o.id,
        checked: o.id == this.selFrequency
      }
    });

    this.frequencyAlert.present();
  }

  handleConfirmAccountType(data) {
    if (!data) {
      return false;
    }

    this.formGroup.get('accountType').setValue(data);
    return true;
  }

  handleConfirmFrequency(data) {
    if (!data) {
      return false;
    }

    this.formGroup.get('frequency').setValue(data);
    return true;
  }

  handleCancelAccountType() {

  }

  handleCancelFrequency() {

  }

  getSelAccountTypeLabel(id: string) {
    return this.accountTypeInputs.find(o => o.id === id)?.label;
  }

  getSelFrequencyLabel(id: string) {
    return this.frequencies.find(o => o.id == id)?.label;
  }

  disableCreateBudget() {
    if (!this.accountId) return false;
    return this.shouldDisable;
  }

  confirm() {
    if (this.formGroup.invalid) return;
    this.dismissData$.emit(this.formGroup.getRawValue());

    this.settingsService.createAccount(this.formGroup.getRawValue()).subscribe((result: any) => {
      this.closeAccountPopup();
    });
  }

  closeAccountPopup() {
    this.formGroup.reset();
    this.modalController.dismiss();
  }
}
