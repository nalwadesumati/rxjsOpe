import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  searchControl = new FormControl('');

  constructor(private _productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.onSearchProduct();
  }

  trackByProductId(index: number, product: any) {
    return product.id;
  }

  loadProducts() {
    this._productService.getProducts('').subscribe((res: any) => {
      this.products = res.products;
      this.filteredProducts = res.products;
    });
  }

  onSearchProduct() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value: string | null) => {
        const search = (value || '').toLowerCase();

        this.filteredProducts = this.products.filter(
          (product: any) =>
            product.title.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search),
        );
      });
  }
}
