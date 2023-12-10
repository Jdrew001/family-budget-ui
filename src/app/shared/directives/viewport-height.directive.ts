import { Directive, HostListener, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appViewportHeight]'
})
export class ViewportHeightDirective implements OnInit {

  @Input() subtractHeightPercentage: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.setDynamicMaxHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setDynamicMaxHeight();
  }

  private setDynamicMaxHeight() {
    const windowHeight = window.innerHeight;
    const newHeightPercentage = 100 - this.subtractHeightPercentage;
    const newMaxHeight = (windowHeight * newHeightPercentage) / 100;
    
    this.renderer.setStyle(this.el.nativeElement, 'max-height', `${newMaxHeight}px`);
  }
}