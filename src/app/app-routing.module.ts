import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/component/home/home.component';
import { ProductsComponent } from './shared/component/products/products.component';
import { CartsComponent } from './shared/component/carts/carts.component';
import { PostsComponent } from './shared/component/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'carts',
    component: CartsComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
