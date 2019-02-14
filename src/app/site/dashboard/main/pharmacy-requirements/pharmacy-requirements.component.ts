import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Item} from 'models/item';
import {ItemsFilterComponent} from 'site/dashboard/ui/items-filter/items-filter.component';
import {ToastrService} from 'ngx-toastr';
import {PharmacyRequirementsService} from 'services/pharmacy-requirements.service';
import {ItemsService} from 'services/items.service';
import {RequirementItem} from 'models/requirement-item';

@Component({
  selector: 'app-pharmacy-requirements',
  templateUrl: './pharmacy-requirements.component.html',
  styleUrls: ['./pharmacy-requirements.component.scss']
})
export class PharmacyRequirementsComponent implements OnInit {

  dataSource: MatTableDataSource<RequirementItem>;
  displayedColumns: string[] = ['name', 'name_en', 'code','actions'] ;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedItem: Item = null;
  @ViewChild(ItemsFilterComponent) itemsFilter: ItemsFilterComponent;
  items: Item[] = [];

  requirements : RequirementItem[] = [] ;


  constructor(private toastr: ToastrService, private requirementsService: PharmacyRequirementsService , private itemsService : ItemsService) {
  }

  tableFilter(row, filter) {
    return row.item.name.includes(filter) || (row.item.code == filter.trim());
  }

  async ngOnInit() {




    this.items =  await this.itemsService.get().toPromise();
    this.requirements = await this.requirementsService.get().toPromise();
    this.dataSource = new MatTableDataSource(this.requirements);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.tableFilter;

  }


  filterFocus() {
    this.itemsFilter.focus();
  }

  async filterEnterKeyDown() {


    if (this.selectedItem == null) {
      return;
    }
    let item = this.selectedItem;
    // already exist
    if (this.requirements.find(it => it.item.id == item.id))
      return;

    let requirement = new RequirementItem({item});
    this.requirements.push(requirement);

    this.filterFocus();
    try {

      let response = await this.requirementsService.add(item.id).toPromise();
      requirement.id = response.id;

      this.toastr.success("تمت الاضافة بنجاح");

    } catch (e) {

      this.toastr.error("لقد حدث خطأ ما الرجاء المحاولة مجدداً");
      this.requirements.splice(this.requirements.findIndex(it => it.item.id == item.id) , 1);
    } finally {

      this.refreshTable();
    }



  }

  async clear() {


    if(this.requirements.length == 0 )
      return ;


    let copy = [...this.requirements];
    this.requirements = [];

    try {

      let response = await this.requirementsService.clear().toPromise();
      this.toastr.success("تم التفريغ بنجاح");

    } catch (e) {

      this.toastr.error("لقد حدث خطأ ما الرجاء المحاولة مجدداً");
      this.requirements = copy;
    } finally {
      this.refreshTable();
    }


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

  async delete(item: RequirementItem) {


    let index =  this.requirements.findIndex(it => it.item.id == item.id);
    this.requirements.splice(index, 1);
    try {


      let response = await this.requirementsService.delete(item.id).toPromise();
      this.toastr.success("تم الحذف بنجاح بنجاح");

    } catch (e) {

      this.toastr.error("لقد حدث خطأ ما الرجاء المحاولة مجدداً");
      this.requirements.splice(index, 0 , item);

    } finally {

      this.refreshTable();
    }

  }


}
