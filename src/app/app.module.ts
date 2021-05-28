import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import {MatRippleModule} from '@angular/material/core';
import { SwiperModule } from 'swiper/angular';
import { OverlayComponent } from './home/overlay/overlay.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import { DisplayComponent } from './display/display.component';
import { CurrencyCustomPipe } from './core/pipes/currency.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';






@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OverlayComponent,
    DisplayComponent,
    CurrencyCustomPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatRippleModule,
    SwiperModule,
    MatBadgeModule,
    MatExpansionModule,
    HttpClientModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
