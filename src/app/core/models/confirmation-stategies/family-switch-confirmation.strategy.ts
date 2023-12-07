import { Injectable } from "@angular/core";
import { CoreService } from "../../services/core.service";
import { ActionStrategy } from "./action-strategy";

@Injectable({
    providedIn: 'root',
  })
export class FamilySwitchConfirmationStrategy implements ActionStrategy {

    constructor(
        public coreService: CoreService
    ) {}

    execute(data): void {
        console.log('family switch confirmation strategy', data);
        this.coreService.confirmFamilySwitch(data.familyId).subscribe(() => {
            this.coreService.$shouldRefreshScreen.next(true);
        });
    }

}