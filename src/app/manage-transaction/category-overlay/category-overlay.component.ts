import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, IonModal, IonSearchbar, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { TransactionType } from 'src/app/core/models/transaction-type.model';

@Component({
  selector: 'app-category-overlay',
  templateUrl: './category-overlay.component.html',
  styleUrls: ['./category-overlay.component.scss'],
})
export class CategoryOverlayComponent  implements OnInit, ViewDidEnter, ViewWillLeave {

  @ViewChild('modal') modalElement: IonModal;
  @ViewChild('scrollContainer') scrollContainer: IonGrid;
  @ViewChild('searchBar') searchBar: IonSearchbar;

  selectedCategory: string;
  selectedCategoryType: TransactionType | null;

  @Input() categoryRefData = [];
  categoryList: Array<{id: string, name: string, type: TransactionType}> = [];
  beforeSearchCategoryList: Array<{id: string, name: string, type: TransactionType}> = [];

  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.modalElement.ionModalDidPresent.subscribe(async () => {
      (this.scrollContainer as any)['el'].ontouchmove = (e) => e.stopPropagation();
    });
  }

  ionViewWillLeave() {
    this.selectedCategory = null;
    this.selectedCategoryType = null;
    this.categoryList = [];
    this.searchBar.value = '';
  }

  onSearch(event: any) {
    const value = event?.detail?.value;
    if (value && value == '') {
      this.categoryList = this.categoryRefData;
      return;
    }

    this.selectedCategoryType = null;
    this.categoryList = this.categoryRefData.filter(category => {
      return category.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  presentModal() {
    this.categoryList = this.categoryRefData;
    this.modalElement.present();
  }

  selectCategory(id: string) {
    this.searchBar.value = '';
    this.categoryList = this.categoryRefData;
    this.selectedCategoryType = null;
    this.beforeSearchCategoryList = [];
    if (this.selectedCategory == id) {
      this.selectedCategory = null;
      return;
    }
    this.selectedCategory = id;
  }

  categoryTypeSelected(type: TransactionType) {
    this.selectedCategory = null;
    if (this.selectedCategoryType == type) {
      this.selectedCategoryType = null;
      this.categoryList = this.categoryRefData;
      return;
    }
    this.selectedCategoryType = type;
    this.categoryList = this.categoryRefData.filter(category => category.type == type);
  }

  onConfirmCategories() {
    this.modalElement.dismiss();
    this.onConfirm.emit(this.selectedCategory);
  }

}
