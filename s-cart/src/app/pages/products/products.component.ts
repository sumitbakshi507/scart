import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.model';
import { ProductFilter, SelectedFilter } from './../../models/product.filter.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productSub: Subscription;
  searchString: string;
  products: Array<Product>;
  filterdProducts: Array<Product>;
  productFilters: Array<ProductFilter>;
  selectedFilter: Array<SelectedFilter>;
  constructor(
    private productService: ProductService) {
      this.searchString = '';
      this.products = [];
      this.productFilters = [];
      this.selectedFilter = [];
    }

  ngOnInit(): void {
    this.productSub = (this.productService.getSearchFilters().subscribe(resp => {
      this.productFilters = resp;
    }));
    this.loadProducts();
  }

  loadProducts() {
    this.productSub = (this.productService.searchProducts(this.searchString).subscribe(resp => {
      this.products = resp;
      this.filterdProducts = this.products;
    }));
  }

  filterChanged(event: Array<SelectedFilter>) {
    this.selectedFilter = event;
  }

  searchProduct() {
    this.loadProducts();
  }
  clearSearchProduct() {
    this.searchString = '';
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }
}
