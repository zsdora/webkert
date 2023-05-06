import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appMyDirective]'
})
export class MyDirectiveDirective   {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'background-color');
  }

  
}
