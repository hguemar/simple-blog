import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from "../article";
import {BlogDbService} from "../blog-db.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-blog-form-article',
  templateUrl: './blog-form-read-article.component.html',
  styleUrls: ['./blog-form-read-article.component.less']
})
export class BlogFormReadArticleComponent implements OnInit {

  private id: string;
  private article: Article;

  constructor(private route: ActivatedRoute,
              private dbService: BlogDbService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.dbService.getArticle(this.id).subscribe((article: Article) => this.article = article);
    });
  }

  getDateStr(date: Date) {
    return formatDate(date, "dd/MM/yyyy", "en-US");
  }
}
