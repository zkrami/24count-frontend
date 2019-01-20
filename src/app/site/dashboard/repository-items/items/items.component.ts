import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RepositoryService} from 'services/repository.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RepositoryItem} from 'models/repository-item';
import {ToastrService} from 'ngx-toastr';
import {ItemDetailsInputComponent} from 'site/dashboard/repository-items/item-details-input/item-details-input.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: RepositoryItem[];
  selectedItem: RepositoryItem = RepositoryItem.init();
  dataSource: MatTableDataSource<RepositoryItem>;
  displayedColumns: string[] = ['name', 'code', 'shape', 'identifier', 'size', 'factory', 'count', 'expiration', 'discount', 'bonus', 'net'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(ItemDetailsInputComponent) itemInput: ItemDetailsInputComponent;

  constructor(private itemsService: RepositoryService, private toastr: ToastrService) {
  }

  tableFilter(row, filter) {

    return row.item.name.includes(filter) || (row.item.code == filter.trim());
  }

  async ngOnInit() {


    this.items = await this.itemsService.items().toPromise();
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.tableFilter;
  }

  filterFocus() {
    this.filter.nativeElement.focus();
    this.filter.nativeElement.select();
  }

  filterEnterKeyDown() {

    if (!this.dataSource.filteredData.length) {
      return;
    }

    this.selectedItem = this.dataSource.filteredData[0];

    this.itemInput.focus();

  }

  filterKeyDown(code) {
    if (code === 'Enter') {
      // Enter Keycode
      this.filterEnterKeyDown();
    }
  }

  rowClick(row) {
    this.selectedItem = row;
  }

  applyFilter(filter: string) {
    if (!this.dataSource) {
      return;
    }  // dataSource not loaded yet
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // send request
  async inputEnterPress() {
    let item = this.selectedItem;
    this.filterFocus();
    if (item.rowState.processing) {
      return;
    } // @todo notify user ( can not proccess row at the time being updated)
    // mark item as being processed
    item.rowState.processing = true;
    item.rowState.error = false;

    try {
      await this.itemsService.update(item).toPromise();
      this.toastr.success(`${item.item.name} تم تحديثه بنجاح `);

    } catch (e) {
      this.toastr.error(` ${item.item.name}  لم يتم تحديثه `);
      item.rowState.error = true;

    } finally {
      item.rowState.processing = false;
    }
  }


}
