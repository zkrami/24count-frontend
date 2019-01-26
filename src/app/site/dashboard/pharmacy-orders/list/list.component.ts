import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Order} from 'models/order';
import {PharmacyOrdersService} from 'services/pharmacy-orders.service';
import {ToastrService} from 'ngx-toastr';
import {ConfirmDialogComponent} from 'site/dashboard/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'created_at', 'repository', 'state', 'actions'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  orders: Order[];
  constructor(private pharmacyOrdersService: PharmacyOrdersService, private toastr: ToastrService, private  dialog: MatDialog) {

  }

  async ngOnInit() {

    this.orders = await this.pharmacyOrdersService.get().toPromise();
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async deleteDialog(order: Order) {

    if (order.rowState.processing) {
      return;
    }
    order.rowState.processing = true;

    try {

      if (await this.pharmacyOrdersService.delete(order).toPromise()) {
        order.rowState.deleted = true;
        this.toastr.success('لقد تم حذف الطلبية بنجاح');

      } else {
        throw Error('Can\'t delete order');
      }
    } catch (e) {
      this.toastr.error('لقد حدث خطأ ما');
    } finally {
      order.rowState.processing = false;
    }
  }

  deleteOrder(order: Order) {

    if (order.rowState.processing) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {message: 'هل أنت متاكد من حذف الطلبية؟'}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.deleteDialog(order);
        }
      }
    );

  }

  async cancelDialog(order: Order) {
    if (order.rowState.processing) {
      return;
    }
    order.rowState.processing = true;

    try {

      if (await this.pharmacyOrdersService.cancel(order).toPromise()) {
        order.state = Order.State.Canceled;
        this.toastr.success('لقد تم الغاء الطلبية بنجاح');
      } else {
        throw Error('Can\'t cancel order');
      }
    } catch (e) {
      this.toastr.error('لقد حدث خطأ ما');
    } finally {
      order.rowState.processing = false;
    }

  }

  cancelOrder(order: Order) {


    if (order.rowState.processing) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {message: 'هل أنت متاكد من الغاء الطلبية؟'}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.cancelDialog(order);
        }
      }
    );

  }


}
