export class Cart {
  discountPercentage: number;
  cartItems: Array<CartItem>;
  constructor() {
    this.discountPercentage = 0;
    this.cartItems = [];
  }
}

export class CartItem {
  productId: string;
  quantity: number;
  price: number;
}
