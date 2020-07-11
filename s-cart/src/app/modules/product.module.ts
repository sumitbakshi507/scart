import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from '../pages/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductFilterComponent } from './../components/product/product-filter/product-filter.component';
import { ProductListComponent } from './../components/product/product-list/product-list.component';

const routes: Routes = [{
  path: '',
  component: ProductsComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ProductsComponent },
  ]
}];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class ProductModule { }

