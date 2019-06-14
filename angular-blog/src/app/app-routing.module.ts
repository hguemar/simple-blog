import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogPageHomeComponent} from "./blog-page-home/blog-page-home.component";
import {BlogFormReadArticleComponent} from "./blog-form-read-article/blog-form-read-article.component";
import {BlogFormCreateArticleComponent} from "./blog-form-create-article/blog-form-create-article.component";

// Routes de l'application
const routes: Routes = [
  {path: '', component: BlogPageHomeComponent},
  {path: 'article/create', component: BlogFormCreateArticleComponent},
  {path: 'article/:id', component: BlogFormReadArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
