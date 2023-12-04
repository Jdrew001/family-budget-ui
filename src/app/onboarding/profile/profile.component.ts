import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  @Input() profileForm: FormGroup;

  get firstname() { return this.profileForm.get('firstname'); }
  get lastname() { return this.profileForm.get('lastname'); }
  get phone() { return this.profileForm.get('phone'); }

  constructor() { }

  ngOnInit() {}

}
