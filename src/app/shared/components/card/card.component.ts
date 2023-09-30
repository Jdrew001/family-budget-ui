import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input('id') id: string;
  @Input('active') isActive: boolean = false;
  @Input('padding') padding: string = '20';
  @Input('margin') margin: string = '20';
  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  handleClick() {
    this.onClick.emit(this.id);
  }

}
