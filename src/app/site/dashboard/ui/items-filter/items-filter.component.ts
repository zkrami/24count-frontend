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
  items: Item[];
  filterControl = new FormControl();
  filteredItems: Observable<Item[]>;

  @Input("placeholder") placeholder : string ;
  constructor(private itemsService: ItemsService) {
  }

  async ngOnInit() {

    this.items = await this.itemsService.get().toPromise();

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
    return item ? item.name : null;
  }


  _filter(value: string): Item[] {

    return this.items.filter(item => {
      return item.name.includes(value) || value === item.code;
    });
  }

}
