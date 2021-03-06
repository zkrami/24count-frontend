import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RepositoryService} from 'services/repository.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RepositoryItem} from 'models/repository-item';
import {ToastrService} from 'ngx-toastr';
import {ItemDetailsInputComponent} from 'site/dashboard/repository-items/item-details-input/item-details-input.component';
import {ItemsFilterComponent} from 'site/dashboard/ui/items-filter/items-filter.component';
import {Item} from 'models/item';
import {ItemsService} from 'services/items.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  repositoryItems: RepositoryItem[];
  selectedItem: RepositoryItem = RepositoryItem.init();
  dataSource: MatTableDataSource<RepositoryItem>;
  displayedColumns: string[] = ['name', 'name_en', 'code', 'shape', 'identifier', 'size', 'factory', 'available', 'expiration', 'discount', 'bonus'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(ItemsFilterComponent) itemsFilter: ItemsFilterComponent;
  @ViewChild(ItemDetailsInputComponent) itemInput: ItemDetailsInputComponent;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private repositoryService: RepositoryService, private toastr: ToastrService , private itemsService : ItemsService) {
  }
  tableFilter(row, filter) {
    return row.item.name.includes(filter) || row.item.code == filter.trim();
  }
  items : Item[] = null;
  async ngOnInit() {
    this.items = await this.itemsService.get().toPromise();
    this.repositoryItems = await this.repositoryService.items().toPromise();
    this.dataSource = new MatTableDataSource(this.repositoryItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.tableFilter;
    this.dataSource.filter = '';

  }

  filterFocus() {
    //this.itemsFilter.focus();
    this.filter.nativeElement.focus();
    this.filter.nativeElement.select();
  }

  refreshTable() {
    this.dataSource._updateChangeSubscription();
  }

  itemsFilterKeyDown(code) {
    this.refreshTable();
    if (code == 'Enter') {

      let item = this.itemsFilter.value;

      if(!item) return ;
      // if already exist select it
      let repositoryItem =
        this.repositoryItems.find(it => it.item.id == item.id);
      if (repositoryItem) {
        this.selectedItem = repositoryItem;
        this.itemInput.focus();
        return;
      }

      // otherwise add it to the list
      repositoryItem = new RepositoryItem();
      repositoryItem.item = item;
      this.repositoryItems.push(repositoryItem);
      this.refreshTable();
      this.selectedItem = repositoryItem;
      this.itemInput.focus();


    }
  }

  filterEnterKeyDown() {

    if (!this.dataSource.filteredData.length) {
      return;
    } else {
      this.selectedItem = this.dataSource.filteredData[0];
    }
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
      this.toastr.warning(`${item.item.name} في حالة تحديث الرجاء المحاولة لاحقا `);
      return;
    }
    // mark item as being processed
    item.rowState.processing = true;
    item.rowState.error = false;

    try {
      await this.repositoryService.update(item).toPromise();
      this.toastr.success(`${item.item.name} تم تحديثه بنجاح `);

    } catch (e) {
      console.log(e);
      this.toastr.error(` ${item.item.name}  لم يتم تحديثه `);
      item.rowState.error = true;

    } finally {
      item.rowState.processing = false;
    }
  }



  importFileWrapperVisible = false;
  readonly maxSize = 1024 * 1024 * 10;  // max size 10 mb
  readonly extensions = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" , "application/vnd.ms-excel"];
  file:File = null ;
  handleFileChange($event){
    this.file = $event.target.files[0] ;
  }

  fileType = new FormControl();
  async uploadFile() {


    let file = this.file;
    if (!file) {
      return this.toastr.error("الرجاء تحديد ملف اولا");
    }
    if (!this.extensions.find(e => e == file.type)) {
      return this.toastr.error("الرجاء تحديد ملف اكسل");
    }
    if (file.size > this.maxSize) {
      return this.toastr.error(`حجم الملف يجب أن يكون أصغر من ${this.maxSize / (1024 * 1024)} mb`);
    }



    try {
      let type = this.fileType.value ;
      let items = await this.repositoryService.import(file , type).toPromise();
      this.repositoryItems = items;
      this.dataSource = new MatTableDataSource(this.repositoryItems);
      this.refreshTable();
      this.toastr.success("لقد تم استيراد المواد بنجاح");
    }catch(e){
      this.toastr.error("لقد حدث خطأ ما");
    }

  }

}
