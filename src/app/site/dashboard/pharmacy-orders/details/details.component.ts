import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatInput, MatPaginator, MatTableDataSource} from '@angular/material';
import {OrderItem} from 'models/order-item';
import {FormControl} from '@angular/forms';
import {Order} from 'models/order';
import {Item} from 'models/item';
import {ItemsFilterComponent} from 'site/dashboard/ui/items-filter/items-filter.component';
import {PharmacyOrdersService} from 'services/pharmacy-orders.service';
import {ToastrService} from 'ngx-toastr';
import {RepositoryService} from 'services/repository.service';
import {Repository} from 'models/repository';

@Component({
  selector: 'app-pharamcy-order-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  dataSource: MatTableDataSource<OrderItem>;
  displayedColumns: string[] = ['name', 'code', 'count'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('count') count: ElementRef;

  // fields to disable
  @ViewChild('saveButton') saveButton: MatButton;
  @ViewChild('count') countInput: MatInput;


  countFormControl = new FormControl();

  @Input('order') order: Order;
  selectedItem: Item = null;
  @ViewChild(ItemsFilterComponent) itemsFilter: ItemsFilterComponent;
  items: Item[] = null;
  repository: Repository = null;
  private disabled = false;

  constructor(private orderService: PharmacyOrdersService, private toastr: ToastrService, private repositoryService: RepositoryService) {
  }

  tableFilter(row, filter) {
    return row.item.name.includes(filter) || (row.item.code == filter.trim());
  }

  async ngOnInit() {

    this.repository = await this.repositoryService.getById(this.order.repository_id).toPromise();
    this.items = this.repository.repositoryItems();
    // associate each OrderItem with Item form this.items
    this.order.items = this.order.items.map(oit => {
      return Object.assign(new OrderItem(), {item: this.items.find(it => it.id == oit.item_id)}, oit);
    });
    this.dataSource = new MatTableDataSource(this.order.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.tableFilter;

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
    this.itemsFilter.focus();
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

  selectedItemChange($item) {
    this.selectedItem = $item;
  }

  refreshTable() {
    this.dataSource._updateChangeSubscription();
  }

  async save() {


    if (this.disabled) {
      return;
    }

    this.disable();

    try {

      let order = await this.orderService.update(this.order).toPromise();
      this.order.id = order.id;
      this.toastr.success('لقد تم حفظ الفاتورة بنجاح', '', {timeOut: 300000});
    } catch (e) {
      this.toastr.error('لقد حدث خطأ ما الرجاء المحاولة لاحقاً');
    } finally {
      this.enable();
    }


  }

  async confirm() {
    if (this.disabled) {
      return;
    }
    this.disable();
    try {
      // update the order first
      let order = await this.orderService.update(this.order).toPromise();
      this.order.id = order.id;

      if (await this.orderService.confirm(this.order).toPromise()) {
        this.toastr.success('لقد تم تسجيل طلبك بنجاح');
        this.order.state = Order.State.Waiting;
      } else {
        throw new Error('didn\'t confirmed ');
      }
    } catch (e) {
      this.toastr.error('لقد حدث خطأ ما الرجاء المحاولة لاحقاً');
      this.enable();
    }

  }

  readonly() {
    return this.order.state !== Order.State.Draft;
  }

  private disable() {

    this.disabled = true;
    this.saveButton.disabled = true;
    this.itemsFilter.disable();
    this.countInput.disabled = true;
  }

  private enable() {

    this.disabled = false;
    this.saveButton.disabled = false;
    this.itemsFilter.enable();
    this.countInput.disabled = false;


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
