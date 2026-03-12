import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  searchControl = new FormControl('');
  trackByProductId(index: number, product: any) {
    return product.id;
  }
  constructor(private _productService: ProductsService) {}

  ngOnInit(): void {
    this.onSearchProduct();
  }

  onSearchProduct() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),

        switchMap((searchText: any) =>
          this._productService.getProducts(searchText),
        ),
      )
      .subscribe((res: any) => {
        this.products = res.products;
      });
  }
}
