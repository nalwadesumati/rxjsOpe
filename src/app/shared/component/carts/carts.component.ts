import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../service/carts.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent implements OnInit {
  carts: any[] = [];
  filteredCarts: any[] = [];

  trackByCartId(index: number, cart: any) {
    return cart.id;
  }
  searchControl = new FormControl('');
  constructor(private _cartService: CartsService) {}

  ngOnInit(): void {
    this.loadCarts();
    this.onSearchCarts();
  }
  loadCarts() {
    this._cartService.getCarts().subscribe((res: any) => {
      this.carts = res.carts;
      this.filteredCarts = this.carts;
    });
  }
  onSearchCarts() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(() => this._cartService.getCarts()),
      )
      .subscribe((res: any) => {
        this.carts = res.carts;

        const val = (this.searchControl.value || '').toLowerCase();

        this.filteredCarts = this.carts.filter((cart: any) =>
          cart.products.some((product: any) =>
            product.title.toLowerCase().includes(val),
          ),
        );
      });
  }
}
