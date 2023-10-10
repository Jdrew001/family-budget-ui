import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CoreService } from '../core/services/core.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selectedTab = 'summary';

  constructor(
    private navController: NavController,
    private coreService: CoreService
  ) { }

  ngOnInit() {
  }

  handleFabClick() {
    // this.navController.navigateForward('/manage-transaction', { animated: true });
    this.coreService.$showManageTransaction.next({data: null, show: true});
  }

  handleTabSelect(event: any) {
    this.selectedTab = event;
  }

}
