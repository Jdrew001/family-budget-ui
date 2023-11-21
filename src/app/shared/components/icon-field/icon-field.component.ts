import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-icon-field',
  templateUrl: './icon-field.component.html',
  styleUrls: ['./icon-field.component.scss'],
})
export class IconFieldComponent  implements OnInit {

  @ViewChild('modal') modalElement: IonModal = {} as IonModal;
  @ViewChild('scrollContainer') scrollContainer: IonGrid = {} as IonGrid;

  @Input() title: string = '';
  @Input() icon: string = '';

  @Output() iconSelected$ = new EventEmitter<string>();

  public ICON_LIST = [
    'appliances',
    'banknotes',
    'bill-2',
    'bill',
    'budget',
    'building-insurance',
    'cafe',
    'car',
    'card-exchange',
    'cash',
    'categorize',
    'champagne',
    'church',
    'clothes',
    'coffee-to-go',
    'cola',
    'confectionery',
    'country-house',
    'debt-2',
    'debt',
    'edit',
    'entertainment-2',
    'entertainment-3',
    'entertainment',
    'expense',
    'gas-station',
    'gift',
    'giving',
    'glass-of-whiskey',
    'grocery',
    'hamburger',
    'home-2',
    'home-decorations',
    'home',
    'infinity',
    'janitor',
    'kawaii-pizza',
    'medical-2',
    'medical-3',
    'medical',
    'money-2',
    'money-3',
    'money-4',
    'money-5',
    'money-6',
    'money-7',
    'money-8',
    'money-transfer',
    'money-yours',
    'money',
    'mortgage',
    'online-store',
    'overview',
    'pets',
    'plush',
    'profit',
    'purse',
    'rent',
    'repayment',
    'savings',
    'shopaholic',
    'shopping-bag',
    'shopping-basket',
    'smart-home',
    'tech',
    'transaction-list',
    'utilities',
    'vending-machine',
    'wallet',
    'yoga'
];

  constructor() { }

  ngOnInit() {}

  modalDidPresent(e) {
    (this.scrollContainer as any)['el'].ontouchmove = (e) => {e.stopPropagation(); console.log('hello')};
  }

  presentModal() {
    this.modalElement.present();
  }

  onConfirmIcon() {
    this.iconSelected$.emit(this.icon);
    this.modalElement.dismiss();
  }

  iconSelected(icon: string) {
    this.icon = icon;
  }

}
