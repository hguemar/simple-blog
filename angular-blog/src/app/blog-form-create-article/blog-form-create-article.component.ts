import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BlogDbService} from "../blog-db.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-blog-form-create-article',
  templateUrl: './blog-form-create-article.component.html',
  styleUrls: ['./blog-form-create-article.component.less']
})
export class BlogFormCreateArticleComponent implements OnInit {
  articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  constructor(private dbService: BlogDbService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onArticleSubmit() {
    let title = this.articleForm.controls.title.value;
    let author = this.articleForm.controls.author.value;
    let content = this.articleForm.controls.content.value;
    this.dbService.createArticle(title, author, content);
    this.router.navigate(['/']);
  }
}
