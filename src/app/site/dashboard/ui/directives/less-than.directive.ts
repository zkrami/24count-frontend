import {Directive, EventEmitter, Input, Output} from '@angular/core';

@Directive({
  selector: '[ngModel][appLessThan]',
  host: {
    "(input)": 'onInputChange($event)'
  }
})
export class LessThanDirective {


  constructor() { }

  @Input("appLessThan") lessThan ;
  @Output() ngModelChange:EventEmitter<any> = new EventEmitter();
  onInputChange($event){
    let value = +$event.target.value;
    let max = +this.lessThan;
    if(value > max)
    {
      $event.target.value = max;
      $event.target.select();
      this.ngModelChange.emit(max);
    }
  }

}
