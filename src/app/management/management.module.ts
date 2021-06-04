import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { ManagementRoutingModule } from './management-routing.module';
import { UploadComponent } from './upload/upload.component';
import { ManagementComponent } from './management.component';
import { CommonModule } from '@angular/common';
import { CurrencyCustomPipe } from '../core/pipes/currency.pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CategoryComponent } from './category/category.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { HomepageComponent } from './homepage/homepage.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CouponComponent } from './coupon/coupon.component';




@NgModule({
  declarations: [
    UploadComponent,
    ManagementComponent,
    ProductComponent,
    OrderComponent,
    GalleryComponent,
    CategoryComponent,
    HomepageComponent,
    CouponComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressBarModule
  ],

})
export class ManagementModule { }
