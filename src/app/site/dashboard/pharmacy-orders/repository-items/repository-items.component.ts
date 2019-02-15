import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Repository} from 'models/repository';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RepositoryItem} from 'models/repository-item';

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

  constructor() {
  }

  @Input('repository') set _repository(repository: Repository) {

    this.repository = repository;
    this.init();
  }

  init() {

    this.dataSource = new MatTableDataSource(this.repository.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.tableFilter;
    this.dataSource.filter = '';
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
}
