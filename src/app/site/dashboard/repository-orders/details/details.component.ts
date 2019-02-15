import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {OrderItem} from 'models/order-item';
import {Order} from 'models/order';
import {ToastrService} from 'ngx-toastr';
import {RepositoryOrdersService} from 'services/repository-orders.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Pharmacy} from 'models/pharmacy';
import {FormControl} from '@angular/forms';
import {ConfirmDialogComponent} from 'site/dashboard/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  dataSource: MatTableDataSource<OrderItem>;
  displayedColumns: string[] = ['name' , 'name_en', 'code', 'count', 'response_count'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  order: Order = null;
  pharmacy: Pharmacy = null;
  disabled: boolean = false;
  @ViewChild('saveButton') saveButton: MatButton;
  @ViewChild('acceptButton') acceptButton: MatButton;
  @ViewChild('rejectButton') rejectButton: MatButton;

  constructor(private orderService: RepositoryOrdersService, private toastr: ToastrService, private router: ActivatedRoute ,  private dialog:MatDialog) {
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


        if(this.order.state == Order.State.Accepted)
        {
          this.displayedColumns.push('expiration');
        }

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
    this.rejectButton.disabled = true;
  }

  enable() {
    this.disabled = false;
    this.saveButton.disabled = false;
    this.acceptButton.disabled = false;
    this.rejectButton.disabled = false;
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

  async acceptDialog() {

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
  accept(){

    const dialogRef = this.dialog.open(ConfirmDialogComponent , {
      width:'350px' ,
      data : {message : 'هل أنت متاكد من قبول الطلبية؟' , success : true}
    });

    dialogRef.afterClosed().subscribe(
      res =>{
        if(res)
          this.acceptDialog();
      }
    );

  }

  readonly() {
    if (!this.order) {
      return true;
    }
    return this.order.state !== Order.State.Waiting;
  }



  async exportOrder() {
    try {
        await this.orderService.export(this.order ).toPromise();
    } catch (e) {
        this.toastr.error("لقد حدث خطأ ما");
    }
  }


  async rejectDialog(){


    if (this.disabled) {
      return;
    }
    this.disable();
    let order = this.order;
    order.rowState.processing = true;
    order.state = Order.State.Rejected;
    try {
      if (await this.orderService.reject(order).toPromise()) {
        this.toastr.success("لقد تم معالجة طلبك بنجاح");
      } else {
        throw Error("couldn't reject");
      }
    }catch (e) {
      this.toastr.error("لقد حدث خطأ ما");
      order.state = Order.State.Waiting;
    }finally {
      this.enable();
    }


  }
  reject() {



    const dialogRef = this.dialog.open(ConfirmDialogComponent , {
      width:'350px' ,
      data : {message : 'هل أنت متاكد من رفض الطلبية؟'}
    });

    dialogRef.afterClosed().subscribe(
      res =>{
        if(res)
          this.rejectDialog();
      }
    );

  }
}
