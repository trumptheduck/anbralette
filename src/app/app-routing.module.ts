import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DisplayComponent } from './display/display.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LayoutComponent } from './layout/layout.component';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "display",
        component: DisplayComponent,
      },
      {
        path: "listing",
        component: ListingComponent,
      },
    ]
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule)
  },
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      }
    ]
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },
  {
    path: "invoice",
    component: InvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
