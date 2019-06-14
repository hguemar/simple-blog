import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPageHomeComponent } from './blog-page-home.component';

describe('BlogPageHomeComponent', () => {
  let component: BlogPageHomeComponent;
  let fixture: ComponentFixture<BlogPageHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPageHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
