import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CouponComponent } from './coupon/coupon.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ManagementComponent } from './management.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  {
    path: "dashboard",
    component: ManagementComponent,
    children: [
      {
        path: "product",
        component: ProductComponent,
      },
      {
        path: "order",
        component: OrderComponent,
      },      {
        path: "gallery",
        component: GalleryComponent,
      },
      {
        path: "upload",
        component: UploadComponent
      },
      {
        path: "category",
        component: CategoryComponent,
      },
      {
        path: "homepage",
        component: HomepageComponent,
      },
      {
        path: "coupon",
        component: CouponComponent,
      },
    ]
  },
  {
    path: "",
    redirectTo: "dashboard/product"
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
