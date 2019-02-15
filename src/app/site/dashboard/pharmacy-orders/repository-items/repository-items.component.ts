import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Repository} from 'models/repository';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {RepositoryItem} from 'models/repository-item';
import {Bonus} from 'models/bonus';

@Component({
  selector: 'app-repository-items',
  templateUrl: './repository-items.component.html',
  styleUrls: ['./repository-items.component.scss']
})
export class RepositoryItemsComponent implements OnInit {


  repository: Repository;
  dataSource: MatTableDataSource<RepositoryItem>;
  displayedColumns: string[] = ['name', 'name_en', 'code', 'shape', 'identifier', 'size', 'factory', 'available', 'expiration', 'discount', 'bonus'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sortedData: RepositoryItem[] = [];

  constructor() {
  }

  @Input('repository') set _repository(repository: Repository) {

    if (!repository) {
      return;
    }
    this.repository = repository;
    this.init();
  }

  init() {

    this.sortedData = this.repository.items.slice();
    this.dataSource = new MatTableDataSource(this.sortedData);
    this.dataSource.paginator = this.paginator;

  }


  ngOnInit() {
  }

  tableFilter(row, filter) {
    return row.item.name_en.toLowerCase().includes(filter.toLowerCase()) || row.item.name.includes(filter) || row.item.code == filter.trim();
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


  // compare string
  compare(a: string, b: string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareBonus(a: Bonus[], b: Bonus[], isAsc) {


    return (() => {

      if (b.length == 0) {
        return 1;
      }
      if (a.length == 0) {
        return -1;
      }
      let maxRealA = Math.max(...a.map(x => x.real));
      let maxRealB = Math.max(...b.map(x => x.real));
      return maxRealA < maxRealB ? 1 : -1;

    })() * (isAsc ? 1 : -1);

  }

  sortData(sort: Sort) {
    const data = this.repository.items.slice(); // original
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.refreshTable();
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.item.name, b.item.name, isAsc);
        case 'name_en':
          return this.compare(a.item.name_en, b.item.name_en, isAsc);
        case 'bonus':
          return this.compareBonus(a.bonus, b.bonus, isAsc);
        default:
          return 0;
      }
    });

    this.refreshTable();


  }


  refreshTable() {
    this.dataSource = new MatTableDataSource(this.sortedData);
    this.dataSource._updateChangeSubscription();
  }
}
