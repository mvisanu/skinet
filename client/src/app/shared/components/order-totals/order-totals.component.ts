import { BasketService } from 'src/app/basket/basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  basketTotal$: Observable<IBasketTotals>;

  constructor(private BasketService: BasketService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.BasketService.basketTotal$;
  }

}