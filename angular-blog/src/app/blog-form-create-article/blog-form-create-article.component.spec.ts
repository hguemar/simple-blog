import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFormCreateArticleComponent } from './blog-form-create-article.component';

describe('BlogFormCreateArticleComponent', () => {
  let component: BlogFormCreateArticleComponent;
  let fixture: ComponentFixture<BlogFormCreateArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogFormCreateArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFormCreateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
