import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DisplayComponent } from './display/display.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
