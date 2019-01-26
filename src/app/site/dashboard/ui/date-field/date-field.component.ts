import {Component, ElementRef, forwardRef, Injector, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FocusMonitor} from '@angular/cdk/a11y';
import {DatePipe} from '@angular/common';
import {catchError, take, timeout} from 'rxjs/operators';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  providers: [

    {provide: MatFormFieldControl, useExisting: DateFieldComponent},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true
    },
  ],
  host: {
    '[class.app-date-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }

})
export class DateFieldComponent implements MatFormFieldControl<string>, OnDestroy, OnInit, ControlValueAccessor {
  static nextId = 0;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'app-date-input';
  id = `example-tel-input-${DateFieldComponent.nextId++}`;
  describedBy = '';
  ngControl = null;
  datePipe = new DatePipe('en-US');
  @ViewChild('year') yearElement: ElementRef;

  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>, private injector: Injector) {


    this.parts = fb.group({
      month: '',
      year: '',
    });

    fm.monitor(elRef, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });

  }

  get empty() {
    const {value: {year, month}} = this.parts;
    return !year && !month;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  private _placeholder: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  private _required = false;

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get value(): string | null {
    let {value: {month, year}} = this.parts;
    if (month != '' || year != '') {
      if(month == "") month = 1;
      if(year == "") year = new Date(Date.now()).getFullYear();
      return this.datePipe.transform((new Date(+year, (+month - 1))), 'yyyy-MM-dd');
    }
    return null;
  }

  @Input()
  set value(date: string | null) {
    this.writeValue(date);
  }

  writeValue(date: any): void {

    if (date) {
      let d = new Date(date);
      this.parts.setValue({month: (d.getMonth() + 1), year: d.getFullYear()});
    }else{
      this.parts.setValue({month: "" , year:  ""});

    }
    this.onChange(this.value);
    this.stateChanges.next();

  }

  change() {

    // convert 22 to 2022
    let {value: {month, year}} = this.parts;
    if (year.length <= 2 && year.length != 0) {
      year = ((+year) + 2000);
      this.parts.setValue({month: month, year: year});
    }

    this.writeValue(this.value);
  }

  ngOnInit(): void {

    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input')!.focus();
    }
  }

  onChange = (delta: any) => {
  };

  onTouched = () => {
  };

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  focus() {


    this.yearElement.nativeElement.focus();
    this.yearElement.nativeElement.select();
    this.stateChanges.pipe(timeout(100), take(1) , catchError ( (e)=> {
      return e;
    }) ).subscribe(() => {
      this.yearElement.nativeElement.focus();
      this.yearElement.nativeElement.select();
    });

  }


  prevent(e) {
    e.preventDefault();
    e.returnValue = false;
    return false;
  }

  monthKeypress(e) {


    // allow edit when selected
    let target = e.target;
    if (target.selectionEnd - target.selectionStart > 0) {
      // if not number
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return this.prevent(e);
      }
      return true;
    }

    // prevent two numbers if not 1
    if (target.value.length == 1) {
      if (target.value == '0') {
        return true;
      }

      if (target.value != '1' || (target.value == '1' && e.which > 50)) {
        return this.prevent(e);
      }
    }

    // prevent bigger than 2
    if (e.target.value.length == 2) {
      return this.prevent(e);
    }
    // prevent leading 0
    if (e.target.value == '' && e.which == 48) {
      return this.prevent(e);
    }

    // if not number
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return this.prevent(e);
    }


  }

  yearKeypress(e) {

    // allow edit when selected
    let target = e.target;
    if (target.selectionEnd - target.selectionStart > 0) {
      // if not number
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return this.prevent(e);
      }
      return true;
    }
    // prevent bigger than 4
    if (e.target.value.length == 4) {
      return this.prevent(e);
    }
    // prevent leading zero
    if (e.target.value == '' && e.which == 48) {
      return this.prevent(e);
    }

    // if not number
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return this.prevent(e);
    }
    return true;

  }


}
