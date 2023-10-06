import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TimeoutHelpers } from '../../utils/timeout.helpers';
import { CircleGaugeModel } from './circle-gauge.model';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-circle-gauge',
  templateUrl: './circle-gauge.component.html',
  styleUrls: ['./circle-gauge.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CircleGaugeComponent {

  @ViewChild('gauge') gaugeComponent: ElementRef;

  _config: CircleGaugeModel;
  get config() { return this._config; }
  @Input() set config (value: CircleGaugeModel) {
    if (value) {
      if (!this.firstRun) {
        return;
      }
      
      this.animate = true;
      this._config = value;
      this.firstRun = false;
    }
  }

  animate = false;
  firstRun = true;

  constructor() {}

  updateAnimations(value: CircleGaugeModel) {
    
  }
}
