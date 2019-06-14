import {Component, OnInit} from '@angular/core';
import {BlogDbService} from "../blog-db.service";
import {Article} from "../article";

@Component({
  selector: 'app-blog-articles',
  templateUrl: './blog-articles.component.html',
  styleUrls: ['./blog-articles.component.less']
})
export class BlogArticlesComponent implements OnInit {

  private articles: Article[];
  private breakpoint;

  private windowMaxTwoWidth = 725;
  private windowMaxThreeWidth = 1050;

  constructor(private dbService: BlogDbService) {
  }

  ngOnInit() {
    this.getArticles();
    this.defineBreakpoint(window.innerWidth);
  }

  getArticles(): void {
    this.dbService.getAllArticles().subscribe((articles: Article[]) => this.articles = articles);
  }

  clickArticleDelete(article) {
    this.dbService.deleteArticle(article._id);
    let articleIndex = this.articles.indexOf(article);
    if (articleIndex > -1) {
      this.articles.splice(articleIndex, 1);
    }
  }

  onResize(event) {
    this.defineBreakpoint(event.target.innerWidth);
  }

  private defineBreakpoint(actualWidth) {
    if (actualWidth <= this.windowMaxTwoWidth) {
      this.breakpoint = 1;
    } else if (actualWidth <= this.windowMaxThreeWidth) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }
  }
}
