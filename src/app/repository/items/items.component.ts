import { Component, OnInit } from '@angular/core';
import {RepositoryItemsService} from '../../services/repository-items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(private itemsService : RepositoryItemsService) { }

  async ngOnInit() {

    let data = await this.itemsService.get().toPromise();

  }

}
