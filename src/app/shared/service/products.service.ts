import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  PRODUCT_URL: string = environment.product_url;
  constructor(private _http: HttpClient) {}

  getProducts(query: string): Observable<any> {
    return this._http.get(this.PRODUCT_URL);
  }
}
