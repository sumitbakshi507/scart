import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../../models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Array<Product>;
  constructor(
    private cartService: CartService
  ) {
    this.products = [];
  }

  ngOnInit(): void {
  }

  addToCart(p: Product) {
    this.cartService.addItemToCart(p);
  }
}
