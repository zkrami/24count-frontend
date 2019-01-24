import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatPaginator, MatTableDataSource} from '@angular/material';
import {OrderItem} from 'models/order-item';
import {Order} from 'models/order';
import {ToastrService} from 'ngx-toastr';
import {RepositoryOrdersService} from 'services/repository-orders.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Pharmacy} from 'models/pharmacy';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  dataSource: MatTableDataSource<OrderItem>;
  displayedColumns: string[] = ['name', 'code', 'count', 'response_count'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  order: Order = null;
  pharmacy: Pharmacy = null;
  disabled: boolean = false;
  @ViewChild('saveButton') saveButton: MatButton;
  @ViewChild('acceptButton') acceptButton: MatButton;

  constructor(private orderService: RepositoryOrdersService, private toastr: ToastrService, private router: ActivatedRoute) {
  }

  tableFilter(row, filter) {
    return row.item.name.includes(filter) || (row.item.code == filter.trim());
  }

  ngOnInit() {

    this.router.paramMap.pipe(switchMap((params) => {
      return this.orderService.getById(+params.get('id'));
    })).subscribe(
      order => {
        this.order = order;
        this.pharmacy = this.order.pharmacy;
        this.dataSource = new MatTableDataSource(this.order.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.tableFilter;
      }
    );


  }

  refreshTable() {
    this.dataSource._updateChangeSubscription();
  }

  disable() {
    this.disabled = true;
    this.saveButton.disabled = true;
    this.acceptButton.disabled = true;
  }

  enable() {
    this.disabled = false;
    this.saveButton.disabled = false;
    this.acceptButton.disabled = false;
  }

  async save() {

    if (this.disabled) {
      return;
    }
    this.disable();
    try {
      if(await this.orderService.update(this.order).toPromise()){
        this.toastr.success("تم التحديث بنجاح");
      }else{
        throw Error("couldn't update");
      }
    } catch (e) {
      console.log(e);
      this.toastr.error("لقد حدث خطأ ما");
    } finally {
      this.enable();
    }

  }

  async accept() {

    if (this.disabled) {
      return;
    }
    this.disable();
    try {

      if( await this.orderService.update(this.order).toPromise() && await this.orderService.accept(this.order).toPromise()){
        this.toastr.success("تم قبول الطلب بنجاح");
        this.order.state = Order.State.Accepted;
      }else{
        throw Error("couldn't update");
      }
    } catch (e) {
      this.toastr.error("لقد حدث خطأ ما");
    } finally {
      this.enable();
    }

  }

  readonly() {
    if (!this.order) {
      return true;
    }
    return this.order.state !== Order.State.Waiting;
  }


}
