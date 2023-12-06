import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent  implements OnInit {

  @Input() categoryForm: FormArray;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async presentAddCategoryModal(category = null) {
    const modal = await this.modalController.create({
      component: AddCategoryComponent,
      componentProps: {
        category: category
      }
    });

    modal.present();
  }

}
