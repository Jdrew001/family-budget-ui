import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  styleUrls: ['./empty-placeholder.component.scss'],
})
export class EmptyPlaceholderComponent  implements OnInit {

  @Input() message: string;
  @Input() icon: string;
  @Input() display: boolean;

  constructor() { }

  ngOnInit() {}

}
