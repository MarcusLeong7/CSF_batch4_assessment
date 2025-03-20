
// TODO Task 2
// Use the following class to implement your store
import {ComponentStore} from "@ngrx/component-store";
import {Cart, LineItem, Product} from "./models";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";

// TaskSlice in an interface that defines the shape of the state
const INIT: Cart = {
  lineItems: [],
}

/* Creates a specialised store for managing the Cart state*/
@Injectable()
export class CartStore extends ComponentStore<Cart>{

  constructor() {
    // Initialize the store with default TaskSlice state
    super(INIT);
  }

  /* Selectors - Query*/
  // Get all line items
  readonly lineItems$ = this.select(state => state.lineItems);
  // Get line item count
  readonly cartItemCount$ = this.select(state => state.lineItems.length);
  // Returns the entire cart state
  readonly cart$ = this.select(state => state);

  /* Mutator - Update Methods */
  // Add line item to cart
  readonly addLineItem = this.updater<LineItem>(
    (state:Cart, newLineItem: LineItem) =>{
      return {
        ...state,
        lineItems: [...state.lineItems, newLineItem]
      } as Cart;
    }
  )

  // Clear Entire Cart
  readonly clearCart = this.updater((state) => {
    return {
      ...state,
      lineItems: []
    };
  });

/*  // Effect to add a product to the cart
  // Transforming a product to a line item format to be added into cart state
  readonly addProductToCart =
    // Takes an observerable (product$)
    this.effect((product$: Observable<{prodId: string, name: string, price: number, quantity: number}>) => {
    return product$.pipe(
      // Transforming into a lineitem
      tap(product => {
        const lineItem: LineItem = {
          prodId: product.prodId,
          name: product.name,
          price: product.price,
          quantity: product.quantity
        };
        this.addLineItem(lineItem);
      })
    );
  });*/
}

