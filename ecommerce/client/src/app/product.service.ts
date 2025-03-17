import {Injectable, inject} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order, Product} from "./models";

@Injectable()
export class ProductService {

  private http = inject(HttpClient)


  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>('/api/categories')
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/category/${category}`)
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  checkout(order: Order) {
    // TODO Task 3
    // Setup headers for the HTTP request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    // Send a POST request to /api/order with the order data
    return this.http.post('/api/order', order, { headers });
  }
}
