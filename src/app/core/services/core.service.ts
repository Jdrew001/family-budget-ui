import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  $shouldRefreshScreen: Subject<boolean> = new Subject<boolean>();
  $showManageTransaction: Subject<{data: any, show: boolean}> = new Subject<{data: any, show: boolean}>();

  constructor() { }
}
