import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-invite-family',
  templateUrl: './invite-family.component.html',
  styleUrls: ['./invite-family.component.scss'],
})
export class InviteFamilyComponent  implements OnInit {

  @Input() familyInviteForm: FormArray;

  constructor() { }

  ngOnInit() {}

}
