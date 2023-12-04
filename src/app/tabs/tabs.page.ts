import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CoreService } from '../core/services/core.service';
import { ManageTransactionPage } from '../manage-transaction/manage-transaction.page';
import * as _ from 'lodash';
import { AlertControllerService } from '../shared/services/alert-controller.service';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selectedTab = 'summary';

  constructor(
    private coreService: CoreService,
    private modalController: ModalController,
    private alertControllerService: AlertControllerService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.coreService.getMasterRefData();
    this.coreService.initializeUserInfo().subscribe(([userInfo, familyStatus]) => {
      this.handleUserInfoResult(userInfo);
      this.handleFamilyStatusResult(familyStatus);
    });
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

  private handleFamilyStatusResult(result) {
    if (result?.data?.dialogConfig) {
      this.alertControllerService.alertBoxSubject$.next({config: result?.data?.dialogConfig, show: true});
    } 
  }

  private async handleUserInfoResult(result) {
    await this.userService.storeUserInformation(result);
  }

}
