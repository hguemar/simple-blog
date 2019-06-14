import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFormReadArticleComponent } from './blog-form-read-article.component';

describe('BlogFormReadArticleComponent', () => {
  let component: BlogFormReadArticleComponent;
  let fixture: ComponentFixture<BlogFormReadArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogFormReadArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFormReadArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
