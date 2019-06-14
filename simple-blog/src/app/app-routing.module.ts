import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogAccueilComponent} from './pages/blog-accueil/blog-accueil.component';
import {BlogArticleComponent} from './pages/blog-article/blog-article.component';

const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: BlogAccueilComponent},
  {path: 'article/new', component: BlogArticleComponent},
  {path: 'article/:postid', component: BlogArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
