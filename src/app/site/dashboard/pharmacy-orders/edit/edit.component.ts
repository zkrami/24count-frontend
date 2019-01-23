import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {PharmacyOrdersService} from 'services/pharmacy-orders.service';
import {Order} from 'models/order';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  order: Order = null;

  constructor(private router: ActivatedRoute, private pharmacyOrderService: PharmacyOrdersService) {
  }

  ngOnInit() {

    this.router.paramMap.pipe(switchMap(params => {
      return this.pharmacyOrderService.getById(+params.get('id'));
    })).subscribe(order => {
      this.order = order;
    });
  }

}
