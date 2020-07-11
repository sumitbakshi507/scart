export class Product {
  brand: string;
  colour: Color;
  discount: number;
  id: string;
  image: string;
  price: Price;
  rating: number;
  title: string;
}

export class Color {
  color: string;
  title: string;
}

export class Price {
  mrp: number;
  // tslint:disable-next-line:variable-name
  final_price: number;
}
