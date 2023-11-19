import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent  implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  presentModal(data?: any) {

  }

  closeCategoryPopup() {
    this.modalController.dismiss();
  }

}
