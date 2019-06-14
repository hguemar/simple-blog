import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {formatDate} from "@angular/common";
import {Article} from "../article";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.less']
})
export class BlogArticleComponent implements OnInit {

  @Input() article: Article;

  @Output() clickDeleteEvent = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getDateStr(date: Date) {
    return formatDate(date, "dd/MM/yyyy", "en-US");
  }

  clickDelete(article: Article) {
    this.clickDeleteEvent.emit(article);
  }

  clickRead(article: Article) {
    this.router.navigate(['article', article._id]);
  }
}
