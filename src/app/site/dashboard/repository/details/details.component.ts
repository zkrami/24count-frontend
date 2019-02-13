import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Repository} from 'models/repository';
import {switchMap} from 'rxjs/operators';
import {RepositoryService} from 'services/repository.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RepositoryItem} from 'models/repository-item';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  repository: Repository;
  dataSource: MatTableDataSource<RepositoryItem>;
  displayedColumns: string[] = ['name', 'name_en', 'code', 'shape', 'identifier', 'size', 'factory', 'available', 'expiration', 'discount', 'bonus'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: ActivatedRoute, private repositoryService: RepositoryService) {
  }

  ngOnInit() {

    this.router.paramMap.pipe(switchMap(params => {
      return this.repositoryService.getById(+params.get('id'));
    })).subscribe(repository => {
      this.repository = repository;
      this.dataSource = new MatTableDataSource(this.repository.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.tableFilter;
      this.dataSource.filter = '';

    });
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
