import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatInput, MatPaginator, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {ItemsService} from 'services/items.service';
import {Item} from 'models/Item';
import {OrderService} from 'services/order.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Order} from 'models/order';
import {OrderItem} from 'models/order-item';
import {RepositoryFilterComponent} from 'site/dashboard/order/repository-filter/repository-filter.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  items: Item[];
  filterControl = new FormControl();
  filteredItems: Observable<Item[]>;


  dataSource: MatTableDataSource<OrderItem>;
  displayedColumns: string[] = ['name', 'code', 'count'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('count') count: ElementRef;
  @ViewChild('filter') filter: ElementRef;

  // fields to disable
  @ViewChild('saveButton') saveButton: MatButton;
  @ViewChild('filter') filterInput: MatInput;
  @ViewChild('count') countInput: MatInput;


  countFormControl = new FormControl();


  order: Order = new Order();
  selectedItem: Item = null;
  @ViewChild('repository') repositoryComponent: RepositoryFilterComponent;

  constructor(private itemsService: ItemsService
    , private orderService: OrderService, private toastr: ToastrService) {
  }

  tableFilter(row, filter) {
    return row.item.name.includes(filter) || (row.item.code == filter.trim());
  }

  async ngOnInit() {


    this.items = await this.itemsService.get().toPromise();
    this.dataSource = new MatTableDataSource(this.order.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.tableFilter;
    this.filteredItems = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));


  }

  _filter(value: string): Item[] {

    return this.items.filter(item => {
      return item.name.includes(value) || value === item.code;
    });
  }

  countFocus() {
    this.count.nativeElement.focus();
    this.count.nativeElement.select();
  }

  countEnterKeyDown() {

    this.updateOrPush(this.selectedItem, this.countFormControl.value);
    this.refreshTable();
    this.filterFocus();
  }

  countKeyDown(code) {
    if (code === 'Enter') {
      // Enter KeyCode
      this.countEnterKeyDown();
    }
  }

  filterFocus() {
    this.filter.nativeElement.focus();
    this.filter.nativeElement.select();
  }

  filterEnterKeyDown() {

    if (this.selectedItem == null) {
      return;
    }

    this.countFocus();
  }

  filterKeyDown(code) {
    if (code === 'Enter') {
      // Enter Keycode
      this.filterEnterKeyDown();
    }
  }

  itemDisplay(item: Item): string {
    return item ? item.name : null;
  }

  selectedItemChange($item) {
    this.selectedItem = $item;
  }

  refreshTable() {
    this.dataSource._updateChangeSubscription();

  }

  refreshTableData() {
    this.dataSource.data = this.order.items;
    this.refreshTable();
  }

  async save() {

    // get repository id
    this.order.repository_id = this.repositoryComponent.value ? this.repositoryComponent.value.id : null;

    this.disable();

    try {

      let order = await this.orderService.update(this.order).toPromise();
      console.log(order);
      //this.order = order;
      this.refreshTableData();

      this.toastr.success('لقد تم حفظ الفاتورة بنجاح');
    } catch (e) {
      this.toastr.error('لقد حدث خطأ ما الرجاء المحاولة لاحقاً');
    } finally {
      this.enable();
    }


  }

  private disable() {

    this.saveButton.disabled = true;
    this.filterInput.disabled = true;
    this.countInput.disabled = true;
    this.repositoryComponent.disable();
  }

  private enable() {

    this.saveButton.disabled = false;
    this.filterInput.disabled = false;
    this.countInput.disabled = false;
    this.repositoryComponent.enable();


  }

  private updateOrPush(item: Item, count: number) {


    const found = this.order.items.find(it => {
      return (it.item_id === item.id);
    });
    if (found) {
      found.count = count;
    } else {
      this.order.items.push(new OrderItem({item_id: item.id, count: count, item: item}));
    }
  }

}
