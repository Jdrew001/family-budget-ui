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

  @ViewChild(AlertBoxComponent, { static: false }) alertBox: AlertBoxComponent;

  selectedTab = 'summary';

  constructor(
    private navController: NavController,
    private coreService: CoreService,
    private alertControllerService: AlertControllerService
  ) { }

  ngOnInit() {
    this.coreService.getMasterRefData();
    this.coreService.checkFamilyStatus().subscribe((result: GenericModel<{familyId: string, dialogConfig: AlertModal}>) => {
      if (!result.data.dialogConfig) return;
      this.alertControllerService.alertBoxSubject$.next({config: result.data.dialogConfig, show: true});
    });
  }

  handleFabClick() {
    this.coreService.$showManageTransaction.next({data: null, show: true});
  }

  handleTabSelect(event: any) {
    this.selectedTab = event;
  }

  onAlertAction(payload: {action: string, data: any}) {
    this.coreService.handleAlertAction(payload);
  }

}
