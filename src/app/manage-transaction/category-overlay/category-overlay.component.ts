import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, IonModal, IonSearchbar, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { CoreConstants } from 'src/app/core/constants/core.constants';
import { TransactionType } from 'src/app/core/models/transaction-type.model';

@Component({
  selector: 'app-category-overlay',
  templateUrl: './category-overlay.component.html',
  styleUrls: ['./category-overlay.component.scss'],
})
export class CategoryOverlayComponent  implements OnInit, ViewWillLeave {

  @ViewChild('modal') modalElement: IonModal = {} as IonModal;
  @ViewChild('scrollContainer') scrollContainer: IonGrid = {} as IonGrid;
  @ViewChild('searchBar') searchBar: IonSearchbar = {} as IonSearchbar;

  selectedCategory: string = '';
  selectedCategoryType: TransactionType | null = null;

  @Input() categoryRefData = [];
  categoryList: Array<{id: string, name: string, type: TransactionType}> = [];
  beforeSearchCategoryList: Array<{id: string, name: string, type: TransactionType}> = [];

  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  modalDidPresent(e) {
    (this.scrollContainer as any)['el'].ontouchmove = (e) => {e.stopPropagation(); console.log('hello')};
  }

  ionViewWillLeave() {
    this.selectedCategory = '';
    this.selectedCategoryType = null;
    this.categoryList = [];
    this.searchBar.value = '';
  }

  // onSearch(event: any) {
  //   const value = event?.detail?.value;
  //   if (value && value == '') {
  //     this.categoryList = this.categoryRefData;
  //     return;
  //   }

  //   this.selectedCategoryType = null;
  //   this.categoryList = this.categoryRefData.filter((category: any) => {
  //     return category.name.toLowerCase().includes(value.toLowerCase());
  //   });
  // }

  presentModal() {
    this.categoryList = this.categoryRefData;
    this.modalElement.present();
  }

  selectCategory(id: string) {
    this.selectedCategory = null;
    this.categoryList = this.categoryRefData;
    this.selectedCategoryType = null;
    this.beforeSearchCategoryList = [];
    this.selectedCategory = id;

    setTimeout(() => {this.onConfirmCategories();}, CoreConstants.ANIMATION_DURATION)
  }

  categoryTypeSelected(type: TransactionType) {
    this.selectedCategory = '';
    if (this.selectedCategoryType == type) {
      this.selectedCategoryType = null;
      this.categoryList = this.categoryRefData;
      return;
    }
    this.selectedCategoryType = type;
    this.categoryList = this.categoryRefData.filter((category: any) => category.type == type);
  }

  onConfirmCategories() {
    this.modalElement.dismiss();
    this.onConfirm.emit(this.selectedCategory);
  }

}
