import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "./article";

@Injectable({
  providedIn: 'root'
})
export class BlogDbService {

  private apiUrl = "http://localhost:8000/api";
  private articleUrl = this.apiUrl + "/article";

  constructor(private http: HttpClient) {
  }

  getArticle(idArticle) {
    return this.http.get<Article>(this.articleUrl + "/" + idArticle);
  }

  getAllArticles() {
    return this.http.get<Article[]>(this.articleUrl + "/all");
  }

  createArticle(title, author, content) {
    let article = {
      title: title,
      date: new Date(),
      author: author,
      content: content
    };
    let body = {
      type: 'CREATE',
      article: article
    };
    this.http.post(this.articleUrl, body).subscribe(res => {});
  }

  deleteArticle(idArticle) {
    let body = {
      id: idArticle,
      type: 'DELETE'
    };
    this.http.post(this.articleUrl, body).subscribe(res => {
    });
  }
}
