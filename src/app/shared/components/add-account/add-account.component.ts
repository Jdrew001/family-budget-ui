import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonAlert, ModalController, ViewDidLeave } from '@ionic/angular';
import { IdName } from 'src/app/core/models/account.model';
import { CoreService } from 'src/app/core/services/core.service';
import { DateOverlayComponent } from 'src/app/shared/components/date-overlay/date-overlay.component';
import { DateUtils } from 'src/app/shared/utils/date.utils';
import { IconFieldComponent } from '../icon-field/icon-field.component';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent  implements OnInit, ViewDidLeave {
  
  @ViewChild('accountTypeAlert') accountTypeAlert: IonAlert;
  @ViewChild('frequencyAlert') frequencyAlert: IonAlert;
  @ViewChild('dateOverlay') dateOverlay: DateOverlayComponent = {} as DateOverlayComponent;
  @ViewChild('iconField') iconField: IconFieldComponent;


  @Input() onboarding: boolean = false;
  @Input() disabledFields: Array<{name: string, message: string}> = [];

  _account: any;
  @Input() set account(value) {
    if (value) {
      this._account = value;
      this.presentModal(value);
    }
  }

  manageAccount: IdName = {} as IdName;
  minDate: string = DateUtils.formatYYYYMMDD(new Date());
  creatingAccount: boolean = true;

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

  get accountTypeDisabled() { return this.formGroup.get('accountType').disabled; }

  get icon() { return this.formGroup.get('icon'); }

  formGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    beginningBalance: new FormControl('$0.00', Validators.required),
    description: new FormControl(''),
    icon: new FormControl(''),
    accountType: new FormControl('', Validators.required),
    createBudget: new FormControl(true),
    frequency: new FormControl(null), // condtionally required based on createBudget
    startDate: new FormControl('')
  });

  get accountId() { return this.formGroup.get('id'); }
  get beginningBalance() { return this.formGroup.get('beginningBalance'); }
  get name() { return this.formGroup.get('name'); }
  get accountType() { return this.formGroup.get('accountType')?.value; }
  get createBudget() { return this.formGroup.get('createBudget')?.value; }
  get frequencies() { return this.coreService.masterRefData?.frequencies || []; }
  get selFrequency() { return this.formGroup.get('frequency')?.value; }
  get selectedDate() { return this.formGroup?.get('startDate'); }

  get canCreateBudget() {
    return this.accountTypeInputs.find(o => o.id == this.accountType).label === 'Checking'; 
  }

  constructor(
    private coreService: CoreService,
    private modalController: ModalController,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {}

  ionViewDidLeave(): void {
      this.formGroup.reset();
  }

  presentModal(data?: any) {
    this.creatingAccount = true;
    if (!data) return;
    this.creatingAccount = false;
    this.formGroup.setValue(data);

    this.handleDisabledFields();
  }

  handleDisabledFields() {
    this.disabledFields.forEach(field => {
      this.formGroup.get(field.name)?.disable();
    });
  }

  getDisabledMessage(name: string) {
    return this.disabledFields.find(o => o.name === name)?.message;
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

  chooseIcon() {
    this.iconField.presentModal();
  }

  onIconSelected(icon: string) {
    this.icon.setValue(icon);
  }

  onSelectDate(value: any) {
    console.log('date', value);
    this.formGroup.get('startDate')?.setValue(value);
  }

  chooseDate() {
    this.dateOverlay.presentModal();
  }

  getSelDate() {

  }

  handleConfirmAccountType(data) {
    if (!data) {
      return false;
    }

    this.formGroup.get('accountType').setValue(data);

    // if account type is checking, then enable frequency
    if (this.canCreateBudget) {
      this.formGroup.get('createBudget').enable();
      this.formGroup.get('frequency').enable();
      this.formGroup.get('startDate').enable();
    } else {
      this.formGroup.get('createBudget').disable();
      this.formGroup.get('frequency').disable();
      this.formGroup.get('startDate').disable();
    }

    return true;
  }

  handleConfirmFrequency(data) {
    if (data != 0 && data == null) {
      return false;
    }

    this.formGroup.get('frequency').setValue(data);

    console.log('selFreq', this.selFrequency)
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
    return this.frequencies.find(o => o.id === id)?.label;
  }

  confirm() {
    if (this.formGroup.invalid) return;
    this.modalController.dismiss(this.formGroup.getRawValue(), 'confirm');
  }

  delete() {
    this.modalController.dismiss(this.accountId.value, 'delete');
  }

  closeAccountPopup() {
    this.modalController.dismiss(null, 'cancel');
    this.formGroup.reset();
  }
}
