import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() name: string;
  numberOfItems: number;
  alertSubscription: Subscription;
  constructor(private cartService: CartService) {
    this.numberOfItems = 0;
  }

  ngOnInit() {
    const loadedCart = this.cartService.getCartOrder();
    this.loadTotal(loadedCart);
    this.alertSubscription = this.cartService.getNotify().subscribe(resp => {
      this.loadTotal(resp);
    });
  }

  loadTotal(cart: Cart) {
    this.numberOfItems = 0;
    cart.cartItems.forEach(item => {
      this.numberOfItems += item.quantity;
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

}
