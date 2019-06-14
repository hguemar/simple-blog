import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BlogNavbarComponent} from './blog-navbar/blog-navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatToolbarModule, MatSidenavModule, MatListModule, MatGridListModule
} from "@angular/material";
import {BlogArticlesComponent} from './blog-articles/blog-articles.component';
import {HttpClientModule} from "@angular/common/http";
import {BlogPageHomeComponent} from './blog-page-home/blog-page-home.component';
import {BlogArticleComponent} from './blog-article/blog-article.component';
import {BlogFormReadArticleComponent} from './blog-form-read-article/blog-form-read-article.component';
import {BlogFormCreateArticleComponent} from './blog-form-create-article/blog-form-create-article.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BlogNavbarComponent,
    BlogArticlesComponent,
    BlogPageHomeComponent,
    BlogArticleComponent,
    BlogFormReadArticleComponent,
    BlogFormCreateArticleComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
