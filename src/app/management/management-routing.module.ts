import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  {
    path: "dashboard",
    component: ManagementComponent,
  },
  {
    path: "upload",
    component: UploadComponent
  },
  {
    path: "",
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
