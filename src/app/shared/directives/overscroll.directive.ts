import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOverscroll]'
})
export class OverscrollDirective {

  constructor(private el: ElementRef) { }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const element = this.el.nativeElement;
    const overscrollThreshold = 0;

    // Check if the user is scrolling beyond the top of the container
    if (element.scrollTop < -overscrollThreshold) {
      // Add class for subtle bounce effect
      element.classList.add('overscroll-bounce');
    } else {
      // Remove class when not overscrolled
      element.classList.remove('overscroll-bounce');
    }
  }
}