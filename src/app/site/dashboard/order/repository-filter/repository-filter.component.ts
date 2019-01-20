import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Repository} from 'models/repository';
import {Observable} from 'rxjs';
import {RepositoryService} from 'services/repository.service';
import {MatInput} from '@angular/material';


@Component({
  selector: 'app-repository-filter',
  templateUrl: './repository-filter.component.html',
  styleUrls: ['./repository-filter.component.scss']
})
export class RepositoryFilterComponent implements OnInit {

  filterControl = new FormControl();
  filteredRepositories: Observable<Repository[]>;
  repositories: Repository[] = [];
  @Output() selectedChanged: EventEmitter<Repository> = new EventEmitter<Repository>();

  constructor(private repositoryService: RepositoryService) {
  }
  @ViewChild("filter") filterInput  : MatInput;
  disable(){

    this.filterInput.disabled = true;
  }
  enable(){
    this.filterInput.disabled = false;

  }
  private _value: Repository;

  get value(): Repository {
    return this._value;
  }

  async ngOnInit() {


    this.repositories = await this.repositoryService.get().toPromise();

    this.filteredRepositories = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));

  }

  _filter(value: string): Repository[] {

    return this.repositories.filter(repository => {
      return repository.name.includes(value);
    });
  }

  selectedItemChange(repository: Repository) {
    this.selectedChanged.emit(repository);
    this._value = repository;
  }

  repositoryDisplay(repository: Repository): string {
    return repository ? repository.name : null;
  }

}
