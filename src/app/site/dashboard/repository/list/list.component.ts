import {Component, OnInit, ViewChild} from '@angular/core';
import {RepositoryService} from 'services/repository.service';
import {Repository} from 'models/repository';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'address' , 'actions'];
  repositories: Repository[];
  dataSource: MatTableDataSource<Repository>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repositoryService: RepositoryService) {
  }

  async ngOnInit() {

    this.repositories = await this.repositoryService.get().toPromise();
    this.dataSource = new MatTableDataSource<Repository>(this.repositories);
    this.dataSource.filterPredicate = this.filter;
    this.dataSource.paginator = this.paginator;
  }

  filter(row, filter) {
    return row.name.includes(filter) || row.address.includes(filter);
  }

  applyFilter(filter: string) {
    if (!this.dataSource) {
      return;
    }

    // dataSource not loaded yet
    this.dataSource.filter = filter;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
