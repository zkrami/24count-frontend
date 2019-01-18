import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RepositoryItem} from 'models/RepositoryItem';

@Component({
  selector: 'app-item-details-input',
  templateUrl: './item-details-input.component.html',
  styleUrls: ['./item-details-input.component.scss']
})
export class ItemDetailsInputComponent implements OnInit {

  @Input('item') repositoryItem: RepositoryItem;
  @Output('enterPressed') enterPressed = new EventEmitter<RepositoryItem>();
  @ViewChild('countInput') countInput: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }
  focus() {

    this.countInput.nativeElement.focus();
    this.countInput.nativeElement.select();


  }



  inputEnterPress() {
    this.enterPressed.emit(this.repositoryItem);
  }

  inputKeyDown(code) {

    if (code === 'Enter') {
      this.inputEnterPress();
    }
  }


}
