import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Item} from 'models/item';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ItemsService} from 'services/items.service';

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss']
})
export class ItemsFilterComponent implements OnInit {

  @ViewChild('filter') filter: ElementRef;
  @Output() itemChange = new EventEmitter<Item>();
  value: Item = null;
  @Input("items") items: Item[] = [];
  filterControl = new FormControl();
  filteredItems: Observable<Item[]>;

  @Input("disabled") disabled : boolean = false;
  @Input("placeholder") placeholder : string ;
  constructor() {
  }

  ngOnInit() {

    this.filteredItems = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));

  }

   disable() {

  }

  enable() {

  }

  selectedItemChange($item) {
    this.value = $item;
    this.itemChange.emit($item);
  }

  focus() {
    this.filter.nativeElement.focus();
    this.filter.nativeElement.select();
  }

  itemDisplay(item: Item): string {
    return item ? ( item.name + " - " + item.name_en ) : null;
  }


  _filter(value: string): Item[] {

    return this.items.filter(item => {
      return item.name_en.toLowerCase().includes(value.toLowerCase()) || item.name.includes(value) || value === item.code ;
    });
  }

}
