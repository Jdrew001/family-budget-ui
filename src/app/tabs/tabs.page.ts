import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CoreService } from '../core/services/core.service';
import { ManageTransactionPage } from '../manage-transaction/manage-transaction.page';
import * as _ from 'lodash';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selectedTab = 'summary';

  constructor(
    private coreService: CoreService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.coreService.getMasterRefData();
  }

  async handleFabClick() {
    this.coreService.getAccountBalances().subscribe(async result => {
      this.coreService.accountBalanceSummary = result;

      const modal = await this.modalController.create({
        component: ManageTransactionPage,
        componentProps: {
          accounts: _.cloneDeep(this.coreService.accountBalanceSummary)
        }
      });
  
      modal.present();
      // const { data } = await modal.onWillDismiss();
      // if (data && data?.refresh) {
      //   this.summaryService.getSummaryData();
      // }
    });
    //this.coreService.$showManageTransaction.next({data: null, show: true});
    
  }

  handleTabSelect(event: any) {
    this.selectedTab = event;
  }

}
