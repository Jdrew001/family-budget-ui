import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.page.html',
  styleUrls: ['./manage-transaction.page.scss'],
})
export class ManageTransactionPage implements OnInit {

  constructor(
    private navController: NavController,
  ) { }

  ngOnInit() {
  }

  closeTransaction() {
    this.navController.navigateBack('/tabs', { animated: true });
  }

}
