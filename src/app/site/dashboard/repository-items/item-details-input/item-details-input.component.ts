import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RepositoryItem} from 'models/repository-item';
import {DateFieldComponent} from 'site/dashboard/ui/date-field/date-field.component';
import {Bonus} from 'models/bonus';

@Component({
  selector: 'app-item-details-input',
  templateUrl: './item-details-input.component.html',
  styleUrls: ['./item-details-input.component.scss']
})
export class ItemDetailsInputComponent implements OnInit {


  repositoryItem: RepositoryItem;
  @Output('enterPressed') enterPressed = new EventEmitter<RepositoryItem>();
  @ViewChild('expirationInput') expirationInput: DateFieldComponent;

  constructor() {
  }

  @Input('item') set _repositoryItem(value: RepositoryItem) {
    this.repositoryItem = value;
    this.fixBonus();
  }

  ngOnInit() {
  }

  focus() {
    this.expirationInput.focus();
  }

  checkLast(index) {
    let bonuses = this.repositoryItem.bonus;
    if (index == bonuses.length - 1 && (bonuses[index].bonus && bonuses[index].bonus_each)) {
      this.repositoryItem.bonus.push(new Bonus());
    }


  }


  fixBonus() {

    let filtered = this.repositoryItem.bonus.filter(it => {
      return (it.bonus || it.bonus_each);
    });


    this.repositoryItem.bonus = filtered;

    this.repositoryItem.bonus.push(new Bonus());

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
