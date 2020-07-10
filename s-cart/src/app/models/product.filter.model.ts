export class ProductFilter {
  type: string;
  values: Array<ProductFilterAll>;
}

export class BrandFilter {
  title: string;
  value: string;
}

export class ColourFilter {
  color: string;
  title: string;
}

export class PriceFilter {
  displayValue: string;
  key: string;
}

export type ProductFilterAll =
| BrandFilter
| ColourFilter
| PriceFilter;

export class SelectedFilter {
  type: string;
  key: string;
  value: string;

  constructor(
    type: string,
    key: string,
    value: string) {
      this.type = type;
      this.key = key;
      this.value = value;
    }
}
