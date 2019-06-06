import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogAccueilComponent } from './pages/blog-accueil/blog-accueil.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BlogNavbarComponent } from './component/blog-navbar/blog-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Material} from './Material';

@NgModule({
  declarations: [
    AppComponent,
    BlogAccueilComponent,
    BlogNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
