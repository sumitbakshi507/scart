import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'products', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth.module').then(m => m.AuthModule),
    data: { preload: true, delay: true }
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/product.module').then(m => m.ProductModule),
    data: { preload: true, delay: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
