import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  CARD_URL: string = environment.carts_url;
  constructor(private _http: HttpClient) {}

  getCarts(): Observable<any> {
    return this._http.get(this.CARD_URL);
  }
}
