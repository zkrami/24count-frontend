import { Component, OnInit } from '@angular/core';
import {RepositoryItemsService} from '../../../services/repository-items.service';
import { ApiHttpClient } from 'src/app/services/api-http-client.service';
import {Item} from '../../../models/Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(private itemsService : RepositoryItemsService) { }


  items : Item[];
  async ngOnInit() {

    this.items  = await this.itemsService.get().toPromise();
    console.log(this.items);


  }

}
