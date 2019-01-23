import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RepositoryItem} from 'models/repository-item';

@Component({
  selector: 'app-item-details-input',
  templateUrl: './item-details-input.component.html',
  styleUrls: ['./item-details-input.component.scss']
})
export class ItemDetailsInputComponent implements OnInit {

  @Input('item') repositoryItem: RepositoryItem;
  @Output('enterPressed') enterPressed = new EventEmitter<RepositoryItem>();
  @ViewChild('expirationInput') expirationInput: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }
  focus() {

    this.expirationInput.nativeElement.focus();
    this.expirationInput.nativeElement.select();


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
