import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {Order} from 'models/order';
import {ToastrService} from 'ngx-toastr';
import {RepositoryOrdersService} from 'services/repository-orders.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'created_at', 'pharmacy', 'state', 'actions'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  orders: Order[];

  constructor(private repositoryOrdersService: RepositoryOrdersService, private toastr: ToastrService, private dialog: MatDialog) {

  }

  async ngOnInit() {

    this.orders = await this.repositoryOrdersService.get().toPromise();
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;

  }


}
