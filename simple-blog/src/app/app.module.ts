import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BlogAccueilComponent} from './pages/blog-accueil/blog-accueil.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BlogNavbarComponent} from './component/blog-navbar/blog-navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Material} from './Material';
import {BlogFooterComponent} from './component/blog-footer/blog-footer.component';
import {BlogThumbnailComponent} from './component/blog-thumbnail/blog-thumbnail.component';
import {BlogPageService} from './services/blog-page.service';
import {BlogArticleComponent} from './pages/blog-article/blog-article.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogAccueilComponent,
    BlogNavbarComponent,
    BlogFooterComponent,
    BlogThumbnailComponent,
    BlogArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Material
  ],
  providers: [BlogPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
