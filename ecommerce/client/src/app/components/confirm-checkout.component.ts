import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LineItem, Order} from "../models";
import {CartStore} from "../cart.store";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  // TODO Task 3
  private fb = inject(FormBuilder);
  protected form !: FormGroup;

  private cartStore = inject(CartStore);
  private prodSvc = inject(ProductService);
  private router = inject(Router);

  // Create observables to access the cart data
  lineItems$: Observable<LineItem[]> = this.cartStore.lineItems$;
  cart$ = this.cartStore.cart$;

  ngOnInit() {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>("", [ Validators.required, Validators.min(1) ]),
      address: this.fb.control<string>("", [ Validators.required, Validators.min(3) ]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>("")
    })
  }

  placeOrder(): void {
    if (this.form.invalid) {
      // Form is invalid, don't proceed
      return;
    }
    // Get form values
    const formValues = this.form.value;
    // Create the order object according to the Order interface
    const order: Order = {
      name: formValues.name,
      address: formValues.address,
      priority: formValues.priority,
      comments: formValues.comments,
      cart: { lineItems: [] } // We'll populate this from the cart store
    };

    // Get the current cart state and assign it to the order
    this.cartStore.cart$.subscribe(cart => {
      order.cart = cart;

      // Send the order to the backend using the ProductService
      this.prodSvc.checkout(order).subscribe({
        next: (response: any) => {
          // Order was successful, show the order ID
          const orderId = response.orderId;
          alert(`Order placed successfully! Order ID: ${orderId}`);

          // Clear the cart
          this.cartStore.clearCart();

          // Navigate back to the main page
          this.router.navigate(['/']);
        },
        error: (error) => {
          // Order failed, show the error message
          alert(`Error placing order: ${error.message || 'Unknown error'}`);
        }
      });
    });
  }

  // Helper method to calculate total cost
  calculateTotal(items: LineItem[]): number {
    return items.reduce((sum, item)=> sum + (item.price * item.quantity), 0);
  }

}
