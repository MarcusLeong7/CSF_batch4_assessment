import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem, Product} from '../models';
import {CartStore} from "../cart.store";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore);
  private prodSvc = inject(ProductService);

  @Input({ required: true })
  productId!: string

  @Input()
  product!: Product;

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  addToCart() {
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.product.name,
      price: this.product.price
    };

    // Use Cart Store to add line item
    this.cartStore.addLineItem(lineItem);
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

}
