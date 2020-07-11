import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductFilter, SelectedFilter, ProductFilterAll, PriceFilter, BrandFilter, ColourFilter } from './../../../models/product.filter.model';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  @Input() productFilters: Array<ProductFilter>;
  @Input() selectedFilter: Array<SelectedFilter>;
  // tslint:disable-next-line:no-output-native
  @Output('change') change: EventEmitter<Array<SelectedFilter>> = new EventEmitter<Array<SelectedFilter>>();
  showAll: Array<{key: string, more: boolean}>;

  constructor() {
    this.productFilters = [];
    this.selectedFilter = [];
    this.showAll = [];
  }

  ngOnInit(): void {
    this.productFilters.forEach(f => {
      this.showAll.push({ key: f.type, more: false});
    });
  }

  getFilters(type: string) {
    if (this.showAll) {
      this.showAll.forEach(element => {
        if (element.key === type) {
          return element.more;
        }
      });
    }
    return false;
  }

  selectionStatus(f: ProductFilterAll, type: string) {
    const key = this.getKey(f, type);
    const value = this.getLabel(f, type);
    const clickedFilter = this.selectedFilter.filter(item => {
      return item.type === type && item.key === key;
    });

    if (clickedFilter.length > 0) {
      return true;
    }

    return false;
  }

  selectFilter(f: ProductFilterAll, type: string) {
    const key = this.getKey(f, type);
    const value = this.getLabel(f, type);
    const clickedFilter = this.selectedFilter.filter(item => {
      return item.type === type && item.key === key;
    });
    if (clickedFilter.length === 0) {
      this.selectedFilter.push(new SelectedFilter(type, key, value));
    } else {
      const newFilters: Array<SelectedFilter> = [];
      this.selectedFilter.forEach((item) => {
        if (!(item.type === type && item.key === key)) {
          newFilters.push(item);
        }
      });
      this.selectedFilter = newFilters;
    }
    this.change.emit(this.selectedFilter);
  }

  getLabel(f: ProductFilterAll, type: string) {
    if (type.toUpperCase() === 'BRAND') {
      return (f as BrandFilter).title;
    }
    if (type.toUpperCase() === 'PRICE') {
      return (f as PriceFilter).displayValue;
    }
    if (type.toUpperCase() === 'COLOUR') {
      return (f as ColourFilter).title;
    }
  }

  getKey(f: ProductFilterAll, type: string) {
    if (type.toUpperCase() === 'BRAND') {
      return (f as BrandFilter).value;
    }
    if (type.toUpperCase() === 'PRICE') {
      return (f as PriceFilter).key;
    }
    if (type.toUpperCase() === 'COLOUR') {
      return (f as ColourFilter).color;
    }
  }
}
