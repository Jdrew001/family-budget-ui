import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CoreService } from '../core/services/core.service';
import { GenericModel } from '../core/models/generic.model';
import { AlertBoxComponent } from '../shared/components/alert-box/alert-box.component';
import { AlertDialogType, AlertModal, AlertType } from '../shared/components/alert-box/alert-box.model';
import { AlertControllerService } from '../shared/services/alert-controller.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selectedTab = 'summary';

  constructor(
    private coreService: CoreService
  ) { }

  ngOnInit() {
    this.coreService.getMasterRefData();
  }

  handleFabClick() {
    this.coreService.$showManageTransaction.next({data: null, show: true});
  }

  handleTabSelect(event: any) {
    this.selectedTab = event;
  }

}
