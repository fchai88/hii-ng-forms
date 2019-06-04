import { Directive, ElementRef, Renderer2, HostListener, OnInit, ViewChild } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  isExpanded: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.isExpanded = false;
  }

  @HostListener('click') toggleOpen() {
    this.isExpanded = !this.isExpanded;
    let divChildElement = this.elementRef.nativeElement.children[1];

    if (this.isExpanded) {
      this.renderer.addClass(this.elementRef.nativeElement, 'show');
      this.renderer.addClass(divChildElement, 'show');
    }
    else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'show');
      this.renderer.removeClass(divChildElement, 'show');
    }
  }

}
