import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from './../models/product.model';
import { Subject, Observable } from 'rxjs';
import { Cart, CartItem } from './../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  newCart: Cart;
  private subject = new Subject<Cart>();

  constructor(
    private http: HttpClient
  ) {}

  getNotify(): Observable<Cart> {
    return this.subject.asObservable();
  }

  addItemToCart(product: Product) {
    const storedOrder: Cart = JSON.parse(localStorage.getItem('cart'));
    if (storedOrder == null) {
      this.newCart = new Cart();
    } else {
      this.newCart = storedOrder;
    }

    let itemFound = false;
    this.newCart.cartItems.forEach(cartItem => {
      if (cartItem.productId === product.id) {
        cartItem.quantity = cartItem.quantity + 1;
        itemFound = true;
      }
    });

    if (!itemFound) {
      const newCartItem = new CartItem();
      newCartItem.productId = product.id;
      newCartItem.quantity = 1;
      newCartItem.price = product.price.final_price;
      this.newCart.cartItems.push(newCartItem);
    }
    localStorage.setItem('cart', JSON.stringify(this.newCart));
    this.subject.next(this.newCart);
  }

  getCartOrder() {
    const storedOrder: Cart = JSON.parse(localStorage.getItem('cart'));
    if (storedOrder == null) {
      this.newCart = new Cart();
    } else {
      this.newCart = storedOrder;
    }
    return this.newCart;
  }
}
