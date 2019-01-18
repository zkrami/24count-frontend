import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RepositoryService} from 'services/repository-items.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RepositoryItem} from 'models/RepositoryItem';
import {ToastrService} from 'ngx-toastr';
import {RepositoryItemWrapper} from 'models/RepositoryItemWrapper';
import {ItemDetailsInputComponent} from 'site/dashboard/repository/item-details-input/item-details-input.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: RepositoryItem[];
  selectedItem: RepositoryItemWrapper = new RepositoryItemWrapper(RepositoryItem.init());
  dataSource: MatTableDataSource<RepositoryItemWrapper>;
  displayedColumns: string[] = ['name', 'code', 'shape', 'identifier', 'size', 'factory', 'count', 'expiration', 'discount', 'bonus', 'net'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild("itemInput") itemInput: ItemDetailsInputComponent;

  constructor(private itemsService: RepositoryService, private toastr: ToastrService) {
  }

  tableFilter(row, filter) {

    return row.wrapped.item.name.includes(filter) || (row.wrapped.item.code == filter.trim());
  }

  async ngOnInit() {


    this.items = await this.itemsService.items().toPromise();
    this.dataSource = new MatTableDataSource(this.items.map(it => new RepositoryItemWrapper(it)));
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.tableFilter;
  }

  filterFocus() {
    this.filter.nativeElement.focus();
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
    if (item.processing) {
      return;
    } // @todo notify user
    // mark item as being processed
    item.processing = true;

    try {
      await this.itemsService.update(item.wrapped).toPromise();
      this.toastr.success(`${item.wrapped.item.name} تم تحديثه بنجاح `);

    } catch (e) {
      this.toastr.error(` ${item.wrapped.item.name}  لم يتم تحديثه `);
      item.error = true;

    } finally {
      item.processing = false;
    }
  }


}
