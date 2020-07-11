import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Product } from './../models/product.model';
import { ProductFilter } from '../models/product.filter.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(
    private http: HttpClient
  ) {}

  searchProducts(searchString: string) {
    return this.http.get<Array<Product>>(environment.api + 'products?title=' + searchString);
  }

  getSearchFilters() {
    return this.http.get<Array<ProductFilter>>(environment.api + 'filters');
  }
}
