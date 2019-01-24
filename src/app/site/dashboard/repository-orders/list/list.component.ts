import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Order} from 'models/order';
import {PharmacyOrdersService} from 'services/pharmacy-orders.service';
import {ToastrService} from 'ngx-toastr';
import {RepositoryOrdersService} from 'services/repository-orders.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'created_at', 'pharmacy', 'state' , 'actions'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  orders: Order[];

  constructor(private repositoryOrdersService: RepositoryOrdersService , private toastr : ToastrService) {

  }

  async ngOnInit() {

    this.orders = await this.repositoryOrdersService.get().toPromise();
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  async reject(order: Order) {

    if (order.rowState.processing) return false;
    order.rowState.processing = true;
    order.state = Order.State.Rejected;
    try {
      if (await this.repositoryOrdersService.reject(order).toPromise()) {
          this.toastr.success("لقد تم معالجة طلبك بنجاح");
      } else {
        throw Error("couldn't reject");
      }
    }catch (e) {
      this.toastr.error("لقد حدث خطأ ما");
      order.state = Order.State.Waiting;
    }finally {
      order.rowState.processing = false;
    }


  }

}
