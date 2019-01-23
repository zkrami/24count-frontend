import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appMaxInt]'
})
export class MaxIntDirective {


  @Input() appMaxInt : number = 100000000;
  @HostListener('keyup') onMouseEnter() {
    this.el.nativeElement.value =  Math.min( this.appMaxInt , parseInt(this.el.nativeElement.value));
  }
  constructor(private el : ElementRef) { }

}
