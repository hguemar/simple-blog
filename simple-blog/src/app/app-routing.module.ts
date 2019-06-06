import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogAccueilComponent} from './pages/blog-accueil/blog-accueil.component';

const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: BlogAccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
