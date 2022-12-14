import { BasketService } from 'src/app/basket/basket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { IBasketTotals } from '../shared/models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup
  basketTotals$: Observable<IBasketTotals>;

  constructor(private fb: FormBuilder, private accountService: AccountService,
    private basketService: BasketService) { }

  ngOnInit(): void {
    this.createCheckoutFrom();
    this.getAddressFormValues();
    this.getDeliveryMethodValue();
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  createCheckoutFrom() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe(address => {
      if (address) {
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    }, error => {
      console.log(error);
    });
  }

  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket.deliveryMethodId !== null) {
      this.checkoutForm.get('deliveryForm').get('deliveryMethod').patchValue
      (basket.deliveryMethodId.toString());
    }
  }

}
