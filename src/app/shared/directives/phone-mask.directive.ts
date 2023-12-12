import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][phoneMask]'
})
export class PhoneMaskDirective {
  
  constructor(
    private ngControl: NgControl
  ) { }

  @HostListener('input', ['$event'])

  onInputChange(event) {
    const initalValue = this.ngControl.value;
    if (initalValue && initalValue.length > 14) {
      console.log('initalValue', initalValue)
      this.ngControl.control.patchValue(initalValue.slice(0, 14));
    }
    const cleanValue = initalValue.replace(/[^0-9]/g, '');
    const formattedValue = this.formatAsPhone(cleanValue);
    this.ngControl.control.patchValue(formattedValue);
  }

  formatAsPhone(value: string): string {
    const areaCode = value.slice(0, 3);
    const exchange = value.slice(3, 6);
    const subscriber = value.slice(6, 10);
  
    let formattedValue = '';
  
    if (areaCode.length > 0) {
      formattedValue = `(${areaCode}`;
    }
  
    if (exchange.length > 0) {
      formattedValue += `) ${exchange}`;
    }
  
    if (subscriber.length > 0) {
      formattedValue += `-${subscriber}`;
    }
  
    // If the last character is '(', remove it
    if (formattedValue[formattedValue.length - 1] === '(') {
      formattedValue = formattedValue.slice(0, -1);
    }
  
    return formattedValue;
  }
}
