import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-manage-budget',
  templateUrl: './manage-budget.page.html',
  styleUrls: ['./manage-budget.page.scss'],
})
export class ManageBudgetPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  closeBudget() {
    this.modalController.dismiss();
  }

}
