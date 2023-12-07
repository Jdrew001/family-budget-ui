import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FamilyUserModel } from 'src/app/settings/models/settings.model';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.scss'],
})
export class AddFamilyComponent  implements OnInit {

  @ViewChild('modal') modalElement: IonModal = {} as IonModal;
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();

  familyUser: FamilyUserModel = {} as FamilyUserModel;

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get email() { return this.formGroup.get('email'); }

  constructor() { }

  ngOnInit() {}

  presentModal(familyUser: FamilyUserModel = null) {
    this.familyUser = familyUser;
    this.email.setValue(familyUser?.email || '');
    this.modalElement.present();
  }

  dismissModal() {
    this.modalElement.dismiss();
    this.formGroup.reset();
    this.familyUser = null;
  }

  onConfirmInvite() {
    this.onConfirm.emit(this.email.getRawValue());
  }

  onRemoveUser() {
    this.onRemove.emit({email: this.familyUser.email, invitePending: this.familyUser.invitePending});
  }

  modalDidDismiss() {
    this.formGroup.reset();
    this.familyUser = null;
  }
}
