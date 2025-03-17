import {Component, OnInit, inject, OnDestroy} from '@angular/core';
import {map, Observable, Subscription, take} from 'rxjs';
import {Router} from '@angular/router';
import {CartStore} from "./cart.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore);

  itemCount$ = this.cartStore.cartItemCount$;
  hasItemsInCart$ = this.cartStore.cartItemCount$.pipe(map(count => count > 0));

  ngOnInit(): void {
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }

  /* Task 2.4: JavaScript Alert Method*/
    // checkout(): void {
    //   this.hasItemsInCart$.pipe(take(1)).subscribe(hasItems => {
    //     if (hasItems) {
    //       this.router.navigate(['/checkout']);
    //     } else {
    //       alert('Your cart is empty!');
    //     }
    //   });
    // }

}
