import {Component, OnInit} from '@angular/core';
import {Order} from 'models/order';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pharmacy-order-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  order: Order = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (params) => {
        this.order = new Order();
        this.order.repository_id = +params.get("repository");
    });

  }


}
