import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TimeoutHelpers } from '../../utils/timeout.helpers';
import { CircleGaugeModel } from './circle-gauge.model';
import { SharedService } from '../../services/shared/shared.service';
import { ViewDidLeave } from '@ionic/angular';

@Component({
  selector: 'app-circle-gauge',
  templateUrl: './circle-gauge.component.html',
  styleUrls: ['./circle-gauge.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CircleGaugeComponent implements OnChanges {

  @ViewChild('gauge') gaugeComponent: ElementRef = {} as ElementRef;

  _config: CircleGaugeModel = {} as CircleGaugeModel;
  get config() { return this._config; }
  @Input() set config (value: CircleGaugeModel) {
    if (value) {
      this._config = value;
    }
  }

  animate = false;
  firstRun = true;

  constructor() {}

  ngAfterViewInit(): void {
    console.log('hello');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('hello', changes)
    if (changes['config'] && changes['config'].firstChange) {
      // Config input has changed, update animations
      this.updateAnimations(changes['config'].currentValue);
    }
  }

  updateAnimations(value: CircleGaugeModel) {
    this._config = value;
    this.animate = true;
  }
}
