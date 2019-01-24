import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appMaxFloat]'
})
export class MaxFloatDirective {


  valid() :boolean{
    let value  = parseFloat(this.el.nativeElement.value);
    return value <= this.appMaxFloat ;
  }
  @Input() appMaxFloat : number = 100000000;
  @HostListener('keyup') onKeyUp() {

    if(this.valid()) return ;
    this.el.nativeElement.value =  Math.min(this.appMaxFloat , parseFloat(this.el.nativeElement.value));
  }
  constructor(private el : ElementRef) {
  }
}
