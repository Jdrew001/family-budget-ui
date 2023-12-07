import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryType'
})
export class CategoryTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
      case 0:
        return 'Income';
      case 1:
        return 'Expense';
      default:
        return 'Unknown';
    }
  }

}
