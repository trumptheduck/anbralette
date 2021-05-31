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


@NgModule({
  declarations: [
    UploadComponent,
    ManagementComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    MatIconModule
  ],

})
export class ManagementModule { }
