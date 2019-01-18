import {Component, Input, OnInit} from '@angular/core';
import {RepositoryItem} from 'models/RepositoryItem';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {


  @Input('item') repositoryItem : RepositoryItem ;
  constructor() { }

  ngOnInit() {
  }

}
