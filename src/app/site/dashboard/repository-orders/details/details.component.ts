import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
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
  displayedColumns: string[] = ['name', 'code', 'count'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  order: Order = null;
  pharmacy: Pharmacy = null;
  disabled: boolean = false;

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
        console.log(this.order);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.tableFilter;
      }
    );


  }

  refreshTable() {
    this.dataSource._updateChangeSubscription();
  }

  async save() {


    if (this.disabled) {
      return;
    }


  }

  async accept() {
    if (this.disabled) {
      return;
    }


  }

  readonly() {
    return this.order.state !== Order.State.Waiting;
  }


}
